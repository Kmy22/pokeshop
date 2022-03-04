<template>
 <div>
   <h1>CONNEXION</h1>
   Pseudonyme :<Inputtext v-model="text_user" />
   <br/><br/>
   Mot de passe :<Inputtext v-model="text_pwd" />
   <br/><br/>
   <Button label="Connexion" icon = "pi pi-user" @click="connexion"></Button> 
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

    const connexion = () => {
      //console.log(text_user.value + " " + text_pwd.value);
      const params = new URLSearchParams()
      params.append('login', text_user.value)
      params.append('pwd', text_pwd.value)

      API_BACK.post('/connection', params)
        .then(response => {
          console.log(response);
          //TODO
          if (response.status == 200) {
            toast.add({sererity: 'info', summary: 'Connexion réussie', detail: "Bienvenue "+text_user.value+" !" });
            window.sessionStorage.setItem('token', response.data.token);
            window.sessionStorage.setItem('user', text_user.value);

            //router.push('/') ;            
            window.location.reload();
            //router.push('/') ;          
            
          } else {
            toast.add({sererity: 'info', summary: 'Connexion impossible', detail: 'Identifiant ou mot de passe incorrect'});
          }        

        })
        .catch(e => {
          console.error(e);
          toast.add({sererity: 'info', summary: 'Connexion impossible', detail: e });
      })  
    }

      return{
        text_user, 
        text_pwd,     
        connexion
      }
  },
  created(){
    if (window.sessionStorage.getItem('user')) {
      router.push('/') ;
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
