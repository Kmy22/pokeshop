<template>
 <div>
   <h1>INSCRIPTION</h1>
   Pseudonyme :<Inputtext v-model="text_user" />
   <br/><br/>
   Mot de passe :<Inputtext v-model="text_pwd" />
   <br/><br/>
   Adresse mail :<Inputtext v-model="text_mail" />
   <br/><br/>
   <Button label="Inscription" icon = "pi pi-user" @click="inscription"></Button> 
   <p>
   <!--  DEBUG inputs : {{text_user}}  | {{text_pwd}} -->
   </p>    
   <Toast />   
 </div>

 
</template>

<script>

import { defineComponent, ref } from "vue";
import {useToast} from 'primevue/usetoast';
import {API_BACK} from '../http-constants';
import router from '../router'

export default defineComponent({
  setup() {      
      const toast = useToast();
      const text_user = ref("user name") ;
      const text_pwd = ref("password");  
      const text_mail = ref("mail");    

    const inscription = () => {
      //console.log(text_user.value + " " + text_pwd.value);
      const params = new URLSearchParams()
      params.append('login', text_user.value)
      params.append('pwd', text_pwd.value)
      params.append('mail', text_mail.value)


      console.log("OUAIS LE MAIL : "+text_mail.value)

      API_BACK.post('/inscription', params)
        .then(response => {
          console.log(response);
          //TODO
          if (response.status == 200) {
            toast.add({sererity: 'info', summary: 'Inscription réussie', detail: "Bienvenue "+text_user.value+" !" });
            //window.sessionStorage.setItem('token', response.data.token);
            //window.sessionStorage.setItem('user', text_user.value);

            router.push('/Connexion') ;            
            //window.location.reload();
            //router.push('/') ;          
            
          } else {
            toast.add({sererity: 'info', summary: 'Inscription impossible', detail: 'Identifiant ou mot de passe incorrect'});
          }        

        })
        .catch(e => {
          console.error(e);
          toast.add({sererity: 'info', summary: 'Inscription impossible', detail: e });
      })  
    }

      return{
        text_user, 
        text_pwd,
        text_mail,   
        inscription
      }
  }
})

// 2 methodes différents ! 
/*
export default {
  data(){
    return{
      text_user : "user name",    
      text_pwd : "password",
    }     
  } ,
  
  methods:{
    connexion(){
      this.$toast.add({sererity: 'info', summary: 'Connexion', detail: this.text_user});
    }
  }
}
*/
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
