<template>
    
    <v-container fluid >
        <v-layout column>
            <v-card>
                <v-card-text>

                    <v-avatar>
                      <img
                        v-bind:src="userData.avatar"
                        alt="John"
                      >
                    </v-avatar>
                        <v-file-input
                        accept="image/*"
                        label="File input"
                        @change="onSelectedFile"
                        
                      ></v-file-input>
                    
                    <v-text-field
                      
                         v-model="userData.username" 
                        label="Username"></v-text-field>
                    <v-text-field
                        v-model="userData.email"
                        label="Mail"></v-text-field>
                    <v-text-field
                        v-model="userData.bio"
                        label="Biographie"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary"  v-on:click="modifyUser">                       
                        Save Changes
                    </v-btn>
                    <v-btn color="red"  v-on:click="deleteUser">                       
                        delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
        
    </v-container>
</template>

<script>
import axios from "axios";


export default {
        name: 'profile',
        
        data () {
            return {
            id : sessionStorage.getItem("id"),
            tokenVal : sessionStorage.getItem("userLog"),
            image: null,
             
            userData: {},
            UpdateUser: {
              username: "",
              mail: "",
              bio: ""

            }   ,
             
                    
          };
        },
        methods: {

          onSelectedFile(event){
            
            this.image = event
            console.log(this.image)
          },
          //RECUPERATION USER
        getUser() {
          axios
            .get(`http://localhost:3000/api/auth/${this.id}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then((response) => {
              console.log(response.data)
              this.userData = response.data.user;
              console.log(this.userData)

            })
            .catch(function (error) {
              console.log(error);
            });
        },

          //MODIFICATION USER
            modifyUser() {
              const fd = new FormData();   
              console.log(this.userData.username)         
              
              const user ={
              username: this.userData.username,
              email: this.userData.email,
              bio: this.userData.bio,
              // images: this.user.images
            };

            console.log(user)
            fd.append('user', JSON.stringify(user))
            fd.append('image', this.image)
            console.log(fd)
          axios
            .put(`http://localhost:3000/api/auth/modify/${this.id}`, fd, {
              data: fd,
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then((response) => {
              console.log(response)
              this.getUser();
              
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        //SUPPRESSION USER
        deleteUser(){
          axios
            .delete(`http://localhost:3000/api/auth/delete/${this.id}`, {
              headers: {
                Authorization: `Bearer ${this.tokenVal}`,
              },
            })
            .then(() => {
          sessionStorage.clear();
          this.$router.push({ path: "/" });
        })
        }
        

    },
    created() {
    this.getUser();
  },
}
</script>

<style scoped>
.container{
  margin-top:140px;
  margin-bottom:140px;
}
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-top: 50px; */
    width: 400px;
}
.v-card__actions{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
button{
  width: 140px;
}

input{
    width: 400px;
}
</style>
