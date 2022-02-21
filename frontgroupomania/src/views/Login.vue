<template>
  <v-form class="mb-16 mt-16">
    <v-container>
      <v-row>              
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
          v-model="user.email"
          
          filled
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        </v-col>
        
        <v-col
          cols="12"
          md="12"
        >
          <v-text-field
          v-model="user.password"
          filled
          color="deep-purple"
          label="Password"
          style="min-height: 96px"   
          type="password"     
        ></v-text-field>    
        </v-col>

        <div class="my-2">
            <v-btn v-on:click="onSubmitlogin"
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
  // import {bus} from '../main'

  export default {
    name: 'login',
    data: () => ({   
      
      user : {
      email: "",
      password: ""    
      },
      
    }),
    methods:{
      onSubmitlogin(){
        const profile = {
          email : this.user.email,
          password : this.user.password         
        }
      axios
        .post("http://localhost:3000/api/auth/login", profile)
        .then(reponse =>{
          if (reponse.statusText !== "OK"){
            alert("un probleme est survenu")
          return;
          }

          console.log(reponse);
          let log = reponse.data;
          console.log(log);
          sessionStorage.setItem('userLog', log.token);
          sessionStorage.setItem('username', log.username);
          sessionStorage.setItem('mail', log.mail);
          sessionStorage.setItem('bio', log.bio);
          sessionStorage.setItem('id', log.userId);
          sessionStorage.setItem('isAdmin', log.isAdmin);
          // bus.$emit('changeNav',false)
          this.changeNav()
         
          this.$router.push("/posts");
        })
        .catch(function (error) {
          console.log(error.response);
          alert("email ou mot de passe incorrect")
        });
      },
      changeNav(){
        this.$store.dispatch('changeNavBox')
       
      }
    }
  }
</script>

<style scoped>
.row{
  display: flex;
  flex-direction: column;
  width: 500px;
}
.container{
  margin-top: 150px;
  margin-bottom: 150px;
  border: solid 2px rgb(3, 3, 82) ;
  width: 500px;
}   
.my-2{
  text-align: center;
}
</style>