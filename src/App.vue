<template>
 <div>
   <!-- header -->  
   <b>"ici le bandeau qui bouge pas "</b>
   <router-link to="/TestConnexion"><li> Test Connexion </li> </router-link>  
   <router-link to="/TestNotes">  <li>Test Notes</li> </router-link>  
   <h1>_______________________________________________________________</h1>
   <b>"puis la page qui change"</b>
  <!-- pages routée -->
 <router-view/>
 </div>
</template>


<script>
export default {  
}
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
