<template>
    
   <v-container > 
       <h1>Bienvenue chers employés</h1>
       <p>L'entreprise groupomania a créée ce réseau social pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues et augmenter considérablement l'ambiance et la productivité. </p>
       <p>Vous pouvez dès à présent vous connecter ou créer votre compte.</p>
   </v-container>

    
</template>


<script>

export default{
    name: 'Accueil'
}
</script>

<style scoped>
   .container{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       text-align: center;
       margin-top: 160px;
       margin-bottom:160px;

   } 

   h1{
       color: rgb(0, 0, 0);
       margin-bottom: 20px;
   }
    p{
        font-size: x-large;
    }
</style>
