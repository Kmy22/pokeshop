<template>
 <div>
    <!-- header -->     
      
     <h1>PokeShop  </h1>  
    <Bonjour/>
       




    <TabMenu :model="items" />  
    
    
    <router-view/>
  </div>
</template>


<script>
import Bonjour from './components/Bonjour.vue'

export default {  
  components: {
    Bonjour
  },
  data() {
		return {
			items: [
                {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},               
                {label: 'Boutique', icon: 'pi pi-fw pi-shopping-cart', to: '/Boutique'},
                {label: 'Panier', icon: 'pi pi-fw pi-shopping-bag', to: '/Panier'},
                {label: 'Historique', icon: 'pi pi-fw pi-history', to: '/HistoriquePanier'}
            ]
		}
  }/*,
  computed: {
  isAuth(){
    return window.sessionStorage.getItem('token');
  }/*,
  user() {
    return window.sessionStorage.getItem('user');
  }*/
  //}
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


