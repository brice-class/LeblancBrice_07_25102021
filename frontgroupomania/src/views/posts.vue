<template>
  <div class="mb-16">
    
      <!-- <li v-for="(article) in articles" :key="article.id"> -->
      
        
          <v-card
          :key="article.id" v-for="(article) in articles"
            class="mx-auto mt-15"
            max-width="400"
            
          >
          
          <router-link :to="`/post/${article.id}`">
            <v-img
              class="white--text align-end"
              height="250px"
              v-bind:src="article.images"
            >  
            </v-img>
             </router-link>
             <!-- MODAL -->
             <v-app-bar
                flat
                color="rgba(0, 0, 0, 0)"
              >
                <v-app-bar-nav-icon color="white" class="mb-0"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>           
                 <v-icon
                        v-if="article.userId == userId  || isAdmin == 'true'"
                        dark
                        right
                        color="red"
                        @click="deletePost(article.id)"
                      >
                        mdi-delete
                      </v-icon>
                        <v-dialog v-if="article.userId == userId || isAdmin == 'true'"
                        :retain-focus="false"
                          v-model="dialog"          
                          max-width="600px"
                        >
                          <template v-slot:activator="{ on, attrs }">                    
                              <v-icon         
                                @click="modifyId = article.id"                         
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
                                  @click="updatePost(modifyId)"
                                >
                                  modifier
                                </v-btn>
                              </template>
                            </modal>
                       </v-dialog>     

              </v-app-bar>
             <!-- FIN MODAL -->






            <v-card-title class="mt-n5 pt-0">{{article.title}}</v-card-title>           
            <v-card-text class="text--primary">
              <div>{{article.content}}</div>
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
            @click="dislike(article.id)"
              icon
              color="deep-orange"
            >
              <v-icon>mdi-thumb-down</v-icon>
              {{compteurDislike(article.id)}}
            </v-btn>
          </v-col>      
      <v-col
            cols="12"
            sm="3"
          >
            <v-btn 
            @click="like(article.id)"
              icon
              color="blue"
            >
              <v-icon>mdi-thumb-up</v-icon>
              {{compteurLike(article.id)}}
            </v-btn>
          </v-col>
              <v-btn                   
              icon
              @click="isDisplay == false? showItem(article.id, true) :showItem(article.id, false)"
            >
              <v-icon>{{ isDisplay ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="statusShowItem[article.id]">
                <v-divider></v-divider>
                <v-card-text>
                  <div class="font-weight-bold ml-8 mb-2">
              Today
            </div>  
            <v-timeline
              align-top
              dense
            >
              <v-timeline-item
                v-for="(com,k) in article.coms"
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
                        @click="deleteCom(com.id)"
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
              <v-btn v-on:click="createCom(article.id)"
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
import axios from "axios";

import modal from '../components/modal.vue';
import moment from "moment";

  export default {
    components: { modal },
  
    name: 'posts',
    data: () => ({   

      test_coucou : 0,
      isAdmin: sessionStorage.getItem("isAdmin"),   
      color: "blue",
      tokenVal : sessionStorage.getItem("userLog"), 
      userId : sessionStorage.getItem("id"),
      modifyId : 0,
      postUnique:[],
      likeDis:[],
      
      
       //like et dislike//
      
      // MODAL     
      dialog : false,
       //COMMENTAIRE
      isDisplay: false,
      statusShowItem: {
      "" : false
    },
      coms : [],
      comment :{
              content : "",
            },

      username : sessionStorage.getItem("username"), 
  
      // POST
      articles : [],     
      changePost: {
        title : "",
        content: "",
        images : ""
      }     
    }),

    
    methods:{

      // MISE EN FORME DE LA DATE DES COMMENTAIRES
      reformatDate(value) {
      return moment(value).locale("fr").fromNow();
      },

      // FONCTION POUR OUVERTURE DE CARTE
      showItem(id, status) {
      this.statusShowItem[id] = false;  
      if (status) {
        this.$set(this.statusShowItem, id, true);
        console.log(this.statusShowItem);
        this.isDisplay = true;
      } else {
        this.statusShowItem[id] = false;
        console.log(this.statusShowItem);
        this.isDisplay = false;
      }
    },
//-------------POSTS---------------------------------------------------

      //RÉCUPÉRATION DE TOUS LES POSTS
    getAllPosts(){        
        axios
          .get("http://localhost:3000/api/posts/", {
            headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }
          })
          .then(reponse=> {
            console.log(reponse);           
            this.articles = reponse.data
            console.log(this.articles);
          })
      },

      //MODIFICATION DE POST
      updatePost(articleId){
            const newPost = {
            title:this.changePost.title,    
            content: this.changePost.content,
            images: this.changePost.images  
        }
        console.log(articleId)
        axios
        .put(`http://localhost:3000/api/posts/modify/${articleId}`,newPost,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{           
            console.log(reponse)
            this.getAllPosts()
            this.dialog = false
            newPost.title = "",
            newPost.content = "",
            newPost.images = ""
            // router push vers l'article modifié ?
            // tester cette methode en propriété calculé ou watch
        })   
      },
      
      //SUPPRIMÉ LE POST
      deletePost(articleId){   
        console.log(articleId)      
          axios
            .delete(`http://localhost:3000/api/posts/delete/${articleId}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then(() => {
          
          this.getAllPosts(); 
        })
        },
//-----------COMMENTAIRES-------------------------------------------------------

      //CRÉATION DU COMMENTAIRE
      createCom(articleId){
        const com = {
          content : this.comment.content,
          postId : articleId
        }
        axios
        .post("http://localhost:3000/api/com/",com,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{           
            console.log(reponse)
            this.getAllPosts()
            this.comment.content = ""           
        })   
      },

      //RECUPÉRATION DE TOUS LES COMMENTAIRE D'UN POST
      RecupComs() {
      axios
        .get(`http://localhost:3000/api/com/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.tokenVal}`,
          },
        })
        .then((response) => {
          console.log(response)
          this.coms = response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      //SUPPRESSION COMMENTAIRE
      deleteCom(comId){
        console.log(comId)      
          axios
            .delete(`http://localhost:3000/api/com/delete/${comId}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then(() => {          
          this.getAllPosts()
        })
      },
//-----------LIKE-------------------------------------------------------

      //ENVOI 1 LIKE
        like(articleId){
       let likeResult= 1;
       let postUnique = this.articles.find(el => el.id == articleId)
       console.log("récupération de post = ",postUnique)
       let likeDis = postUnique.likeDislikes
       console.log("recup la table likedislike",likeDis)
       let theLikeDis = likeDis.find(el => el.userId == this.userId)
       console.log("recup du vrai likeDis",theLikeDis)
      if (theLikeDis != null && theLikeDis.likeVal == 1 ){
           likeResult = 0
        }
        const postLike = {
          postId : postUnique.id,
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
            this.getAllPosts()                      
        })   
      },

      //ENVOI 1 DISLIKE
      dislike(articleId){
        let likeResult = -1
        let postUnique = this.articles.find(el => el.id == articleId)
         console.log("récupération de post = ",postUnique)
       let likeDis = postUnique.likeDislikes
       console.log("recup la table likedislike",likeDis)
       let theLikeDis = likeDis.find(el => el.userId == this.userId)
       console.log("recup du vrai likeDis",theLikeDis)
       if (theLikeDis != null && theLikeDis.dislike == 1 ){
           likeResult = 0
        }

        const postDislike = {
          postId : articleId,
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
            this.getAllPosts();                      
        })   
      },

      //COMPTEUR LIKE
      compteurLike(postID) 
      {
          for(var i=0; i < this.articles.length; i++)
          {
              var art = this.articles[i];

              if(art.id == postID)
              {
                  var rslt = 0;

                  for(var j=0; j < art.likeDislikes.length; j++)
                  {
                      if(art.likeDislikes[j].likeVal > 0)
                      {
                          rslt++;
                      }
                  }
                  return rslt;
              }
          }
          return 0;
      },

      compteurDislike(postID) 
      {
          for(var i=0; i < this.articles.length; i++)
          {
              var art = this.articles[i];
              if(art.id == postID)
              {
                  var rslt = 0;

                  for(var j=0; j < art.likeDislikes.length; j++)
                  {
                      if(art.likeDislikes[j].dislike > 0)
                      {
                          rslt++;
                      }
                  }
                  return rslt;
              }
          }
      },
    },


    mounted() {
      this.getAllPosts();
  },

  
  }
  
  
</script>

<style scoped>
  li{
    margin-bottom: 60px;
  }
  
 a{
    text-decoration: none;
}
</style>