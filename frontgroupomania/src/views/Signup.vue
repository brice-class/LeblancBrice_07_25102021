<template >
<v-card
      class="mx-auto mt-10 mb-10"
      style="max-width: 500px;"
    >     
      <v-toolbar
        color="indigo darken-4 "
        cards
        dark
        flat
      >       
        <v-card-title class="text-h6  font-weight-regular">
          Formulaire d'inscription
        </v-card-title>
        <v-spacer></v-spacer>       
      </v-toolbar>
      <!-- Formulaire -->
      <v-form
        ref="form"
        v-model="form"
        class="pa-4 pt-6"
      >
      <!-- Username -->
        <v-text-field
          v-model="user.username"
          filled
          color="deep-purple"
          label="username"
          :rules="[rules.required]"
        ></v-text-field>
        <!-- Password -->
        <v-text-field
          v-model="user.password"
          :rules="[rules.password, rules.length(6)]"
          filled
          color="deep-purple"
          counter="6"
          label="Password"
          style="min-height: 96px"   
          type="password"     
        ></v-text-field>    
        <!-- Email     -->
        <v-text-field
          v-model="user.email"
          :rules="[rules.email]"
          filled
          color="deep-purple"
          label="Email address"
          type="email"
        ></v-text-field>
        <!-- biographie -->
        <v-textarea
          v-model="user.bio"
          auto-grow
          filled
          color="deep-purple"
          label="Bio"
          rows="1"
        ></v-textarea>
        
        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="deep-purple"
        >
          <template v-slot:label>
            I agree to the&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Terms of Service</a>
            &nbsp;and&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Privacy Policy</a>*
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          text
          @click="$refs.form.reset()"
        >
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-on:click="onSubmitSignup"
          :disabled="!form"
          :loading="isLoading"
          class="white--text"
          color="deep-purple accent-4"
          depressed
        >
          Submit
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        absolute
        max-width="400"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5 grey lighten-3">
            Legal
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              text
              @click="agreement = false, dialog = false"
            >
              No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              class="white--text"
              color="deep-purple accent-4"
              @click="agreement = true, dialog = false"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
</template>

<script>
  
  import axios from 'axios'
  export default {
    name: 'Signup',

    
    data: () => ({
    agreement: false,
    bio: 'Je suis nouveau',
    dialog: false,
    
    form: false,
    isLoading: false,
    
    
    rules: {
      email: v => !!(v || '').match(/@/) || 'Veuillez entré une adresse email valide',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Le mot de passe doit contenir une majuscule, un chiffre, et un caracter spéciale',
      required: v => !!v || 'Ce champ est requis',
    },
      user : {
       username : undefined,
        password : undefined,
        email :undefined,
        bio : undefined
      },
      
    }),
    methods:{
      onSubmitSignup(){
        const profile = {
          username : this.user.username,
          password : this.user.password,
          email : this.user.email,
          bio : this.user.bio
        }
        console.log(profile)
        axios
        .post("http://localhost:3000/api/auth/signup", profile)
        .then(reponse =>{
          console.log(reponse);
          
        })

      //redirection vers la page connection
        this.$router.push("/login");

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
  border: solid 2px rgb(3, 3, 82) ;
  width: 500px;
}  

.my-2{
  text-align: center;
}
</style>