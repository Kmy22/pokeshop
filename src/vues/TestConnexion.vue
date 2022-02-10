<template>
 <div>
   <h1> TEST DE CONNEXION</h1>
   User  :<Inputtext v-model="text_user" />
   Pwd :<Inputtext v-model="text_pwd" />
   <Button label="Connexion" icon = "pi pi-user" @click="connexion"></Button>  
   <p>
    DEBUG inputs : {{text_user}}  | {{text_pwd}}
   </p>    
   <Toast />   
 </div>

 
</template>

<script>

import { defineComponent, ref } from "vue";
import {useToast} from 'primevue/usetoast';

export default defineComponent({
  setup() {
      const toast = useToast();
      const text_user = ref("user name") ;  
      const text_pwd = ref("password");      

    const connexion = () => {
      toast.add({sererity: 'info', summary: 'Connexion', detail: "user :" + text_user.value + "pwd : " + text_pwd.value });
      console.log(text_user.value + " " + text_pwd.value);
    }

      return{
        text_user, 
        text_pwd,     
        connexion
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
