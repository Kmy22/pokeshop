<template>
 <div>
    <h1> ---- TEST NOTATION ---- </h1>
   <Rating v-model="val" /> 
   <Button label="Noter" icon = "pi pi-user" @click="note"></Button>  
   <p> 
    DEBUG note : {{val}} 
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
      const val = ref(3);

    const note = () => {
      toast.add({sererity: 'info', summary: 'note', detail: val});
    }

      return{      
        val,
        note
      }
  }
})

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
