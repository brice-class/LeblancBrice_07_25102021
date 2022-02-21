<template>
  <div class="mb-16">
    <v-card
            class="mx-auto"
            max-width="500"            
          >
            <v-img
              class="white--text align-end"
              height="300px"
              v-bind:src="postUnique.images"
            > </v-img>                         
            <v-app-bar
                flat
                color="rgba(0, 0, 0, 0)"
              >
                <v-app-bar-nav-icon color="white" class="mb-0"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>   
                   <v-icon
                        v-if="postUnique.userId == userId || isAdmin == 'true'"
                        dark
                        right
                        color="red"
                        @click="deletePost"
                      >
                      
                        mdi-delete
                      </v-icon>
                        <v-dialog v-if="postUnique.userId == userId || isAdmin == 'true'"
                          v-model="dialog"          
                          max-width="600px"
                        >
                          <template v-slot:activator="{ on, attrs }">                    
                              <v-icon                                  
                                  color="primary"
                                  dark
                                  right
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  mdi-application-edit
                                </v-icon>                            
                          </template>
                            <modal v-if="dialog"   @close="dialog = false" >
                              <!-- MODAL POSTE TITRE -->
                              <template v-slot:title>
                                  <v-text-field
                                  label="Titre"
                                  v-model="changePost.title"
                                  required
                                ></v-text-field>
                              </template>  
                                <!-- MODAL POSTE CONTENU -->
                              <template v-slot:content>
                                  <v-text-field
                                  label="Contenu"
                                  v-model="changePost.content"
                                  required
                                ></v-text-field>
                              </template>  
                                <!-- MODAL POSTE IMAGE -->
                              <template v-slot:image>
                                  <v-text-field
                                  label="Image"
                                  v-model="changePost.images"
                                  required
                                ></v-text-field>
                              </template>  
                              <!-- MODAL BOUTON DE FIN  -->
                              <template v-slot:button> 
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog = false"
                                >
                                Fermer
                                </v-btn>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="newPost"
                                >
                                  modifier
                                </v-btn>
                              </template>
                            </modal>
                       </v-dialog>
                      </v-app-bar>
                      <v-card-title class="mt-n10">{{postUnique.title}}</v-card-title>
                      <v-card-text class="text--primary">
                      <div>{{postUnique.content}}</div>
                    </v-card-text>
                  <v-card-actions>
              <v-btn
                color="orange lighten-2"
                text
              >
                Commentaires
              </v-btn>

      <v-spacer></v-spacer>

       <v-col
            cols="12"
            sm="3"
          >
            <v-btn 
            @click="dislike"
              icon
              color="deep-orange"
              
            >
              <v-icon>mdi-thumb-down</v-icon>
              {{postUnique.total_dislike}}
            </v-btn>
          </v-col>      
      <v-col
            cols="12"
            sm="3"
          >
            

            <v-btn 
            @click="like"
              icon
              color="blue"              
            >
              <v-icon>mdi-thumb-up</v-icon>
              {{postUnique.total_like}}
            </v-btn>

          </v-col>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

         <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
              Dernier commentaires
            </div>
  
            <v-timeline
              align-top
              dense
            >
              <v-timeline-item
                v-for="(com,k) in postUnique.coms"
                :key="k"
                :color="color"
                small
              >
                <div>
                  <div class="font-weight-normal">
                    <strong>{{com.user.username }}</strong> {{reformatDate(com.createdAt)}}
                      <v-icon
                        v-if="com.userId == userId || isAdmin == 'true'"
                        dark
                        right
                        color="red"
                        @click="deleteCom"
                      >
                        mdi-delete
                      </v-icon>
                  </div>
                  <div>{{ com.content }}</div>
                </div>
              </v-timeline-item>              
            </v-timeline>
              <v-text-field
              v-model="comment.content"            
              label="laisser un commentaire"           
              ></v-text-field>
              <v-btn v-on:click="createCom"
              x-large
              color="blue darken-1"
              dark
            >
              submit
            </v-btn>
          </v-card-text>      
      </div>
    </v-expand-transition>
  </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import Modal from "../components/modal.vue";
import modal from '../components/modal.vue';
import moment from "moment";

export default{
  components: { modal },
   name: 'post',
   data(){
       return{
            changePost: {
              title : "",
              content: "",
              images : ""
            },     
            
            color: "blue",
            id : this.$route.params.id,
            tokenVal : sessionStorage.getItem("userLog"),
            isAdmin: sessionStorage.getItem("isAdmin"),
            userId : sessionStorage.getItem("id"),
            postUnique : [],
            likeDis: [],
            dialog: false,
            show: false,
            comment :{
              content : "",
            },
            components : {
                
                Modal,
       },
       }
       
   },
   methods:{

     // MISE EN FORME DE LA DATE DES COMMENTAIRES
     reformatDate(value) {
      return moment(value).locale("fr").fromNow();
    },

//-------------POSTS---------------------------------------------------

      //RECUPERATION DU POST
      getOnePost(){
        console.log("\ncoucou\n")
          axios
       .get(`http://localhost:3000/api/posts/${this.id}`, {
            headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }            
        })
        .then(reponse=>{
            this.postUnique = reponse.data
            this.likeDis = reponse.data.likeDislikes

            console.log("reponse data " , reponse.data)
            console.log("reponse data likeDislikes " , this.likeDis)

            console.log(typeof(this.isAdmin))
        })   
      },

    //MODIFICATION DU POST
     newPost(){
            const updatePost = {
            title:this.changePost.title,    
            content: this.changePost.content,
            images: this.changePost.images  
        }
        const postId = this.postUnique.id
        console.log(postId, updatePost)       
        axios
        .put(`http://localhost:3000/api/posts/modify/${postId}`,updatePost,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{
            this.dialog = false
            console.log(reponse)
            this.getOnePost();
        })   
      },

        //SUPPRIMÉ LE POST
      deletePost(){         
          axios
            .delete(`http://localhost:3000/api/posts/delete/${this.postUnique.id}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then(() => {
          
          this.$router.push({ path: "/posts" });
        })
        },
      
 //-----------COMMENTAIRES-------------------------------------------------------     
        //CREATION DE COMMENTAIRE
      createCom(){
        const com = {
          content : this.comment.content,
          postId : this.postUnique.id
        }
        axios
        .post("http://localhost:3000/api/com/",com,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{           
            console.log(reponse)
            this.getOnePost()
            this.comment.content = ""          
        })   
      },

      //SUPRESSION DE COMMENTAIRE
      deleteCom(){
            axios
            .delete(`http://localhost:3000/api/posts/delete/${this.postUnique.id}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then(() => {
          
          this.$router.push({ path: "/posts" });
        })
        },


//-----------LIKE-------------------------------------------------------

      //LIKE UN POST
      like(){
        // console.log(this.likeDis.find(el => el.userId == this.userId))
        let likeResult = 1

        let superFind = this.likeDis.find(el => el.userId == this.userId)
        console.log("super find = ",superFind)
        if (superFind != null && superFind.likeVal == 1 ){
           likeResult = 0
        }
        const postLike = {
          postId : this.postUnique.id,
          likeVal : likeResult
        }
        axios
        .post("http://localhost:3000/api/like",postLike,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{
            
            console.log(reponse)
            this.getOnePost()                      
        })   
      },

      //ENVOI 1 DISLIKE
      dislike(){
        let likeResult = -1

        let superFind = this.likeDis.find(el => el.userId == this.userId)
        console.log("super find = ",superFind)

        if (superFind != null && superFind.dislike == 1 ){
           likeResult = 0
        }
        const postDislike = {
          postId : this.postUnique.id,
          likeVal : likeResult
        }
        axios
        .post("http://localhost:3000/api/like",postDislike,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{
            
            console.log(reponse)
            this.getOnePost()                      
        })   
      },
      deleteLikeDislike(){
        const deleteLike = {
          postId : this.postUnique.id,
          likeVal : 0
        }
        axios
        .post("http://localhost:3000/api/like",deleteLike,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{
            
            console.log(reponse)
            this.getOnePost()                      
        })   
      },
      
      

   },
   mounted(){
       this.getOnePost()
       
}}
</script>

<style scoped>
.v-card{
    margin-top: 60px;
    
}
li{
  list-style: none;
}
a{
    text-decoration: none;
}
</style>
