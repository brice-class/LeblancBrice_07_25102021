<template>
    <header>
        <router-link to="/" exact><img src="../assets/icon-left-font-monochrome-white.svg"  alt=""></router-link>
      
        <nav v-if="navBox">
            <ul id="blanc">
                <li ><router-link  to="/Signup">S'inscrire</router-link></li>
                <li><router-link to="/login">Se connecter</router-link></li>                
            </ul>
        </nav>
        <!-- <nav v-if="navBox == false">
            <ul>
                <li> <router-link to="/posts"> Posts </router-link></li>
                <li> </li>
            </ul>
        </nav> -->
        <v-menu offset-y v-if="navBox == false">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                indigo darken-4
                v-bind="attrs"
                v-on="on"
                >
                tableau de bord
                </v-btn>
            </template>
            <v-list>
            <v-list-item> <router-link to="/posts"> Posts </router-link> </v-list-item>
            <v-list-item > <router-link to="/profile"> Mon profile  </router-link></v-list-item>
            <v-list-item > <router-link to="/createPost"> Créé un nouveau post</router-link></v-list-item>
            
            </v-list>
        
    </v-menu>
    </header>
</template>

<script>
//  import {bus} from '../main'

export default {
   

    data(){
        return{
            
            username : sessionStorage.getItem("username"),
            mail : sessionStorage.getItem("mail"),
            
        }
    },
    
    methods:{
       navLog(){
           console.log(this.navBox)
       }
       
    },
    computed:{
          navBox(){
              return  this.$store.state.navBox
          }  
    },

    
    mounted()  {
        // this.funcNav();
        // bus.$on('changeNav',(data)=>{
        //     this.navBox = data
        // })
        this.navLog();
       
        
    },
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-between;
    background-color:rgb(3, 3, 82) ;
}
img{
    height: 200px;
    width: 450px;
    margin-left: 30px;
    
}
nav{
    display: flex;
    width: 500px;
    margin-right: 20px;
    align-items: center;
    flex-wrap: nowrap;
}
button{
    display: flex;
    color:rgb(3, 3, 82) ;
    margin: 90px;
    align-items: center;
    flex-wrap: nowrap;
    width: 190px;
    }

ul{

    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    width: 100%;
    
}
li{
    list-style-type: none;
    font-size:x-large;
    margin: 0px 20px;
    color : white;
    
    
}
a{
    outline: none;
    text-decoration: none;
    color: black;
}
.v-application a{
    color:black;
}
#blanc a{
    color: white;
}
</style>
