<template >
 
  <v-form class="mb-10" >
    <v-container >
      <v-row >
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="post.title"           
            label="titre"
            required
          ></v-text-field>
        </v-col>

        <br><br>

        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="post.content"            
            label="contenu"
            required
          ></v-text-field>
        </v-col>

      <br>

        <v-col 
          cols="12"
          md="12"
        >
          <v-text-field
            v-model="post.images"
            label="url image"
            required
          ></v-text-field>
        </v-col>

        

        <div class="my-2">
            <v-btn v-on:click="createPost"
              x-large
              color="red darken-1"
              dark
            >
              submit
            </v-btn>
          </div>

      </v-row>
    </v-container>
  </v-form>
</template>



<script>
import axios from 'axios'
 export default {
    name: 'createPost',
    data: () => ({   
      tokenVal : sessionStorage.getItem("userLog"),
      post : {
        title:"",    
        content: "",
        images: ""    
    },
    }),
    methods:{
        createPost(){
            const validPost = {
            title:this.post.title,    
            content: this.post.content,
            images: this.post.images   
        }
        axios
        .post("http://localhost:3000/api/posts/",validPost,{
          headers : {
              Authorization: `Bearer ${this.tokenVal}`
            }   
        })
        .then(reponse=>{
            
            console.log(reponse)
            this.$router.push("/posts");
        })   
        }

    }

 }

</script>

<style lang="scss" scoped>

.row{
  display: flex;
  flex-direction: column;
  width: 500px;
}
.container{
  margin-top: 70px;
  margin-bottom: 75px;
  border: solid 2px rgb(3, 3, 82) ;
  width: 500px;
}  

.my-2{
  text-align: center;
}
</style>