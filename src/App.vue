<template>
 <div>
    <!-- header -->    
    <h1>PokeShope</h1>    
    <router-link to='/TestConnexion'> Connexion</router-link>    
    <TabMenu :model="items" />

    <b>"la page qui change"</b> 
    <router-view/>
  </div>
</template>


<script>
export default {  
  data() {
		return {
			items: [
                {label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},               
                {label: 'TestNotes', icon: 'pi pi-fw pi-pencil', to: '/TestNotes'},
                {label: 'Boutique', icon: 'pi pi-fw pi-file', to: '/Boutique'},
                {label: 'autres..', icon: 'pi pi-fw pi-cog', to: '/Connexion'}
            ]
		}
  }
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


