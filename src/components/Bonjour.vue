<template>
    <div id="bjr">             
        <div v-if="isAuth" style="">
            <h1> Bienvenue {{user2}}</h1>  
            <button class="p-button p-component p-button-raised p-button-danger p-mb-2" type="button" data-v-6edbeebf>
                <span class="p-button-label">Déconnexion</span> 
            </button>
        </div>        
        <router-link v-else to='/Connexion'> Connexion</router-link>
    </div>   
</template>


<script>
export default {  
    el: '#bjr',    
    computed: {
        user2 : function(){
            return window.sessionStorage.getItem('user')
        } ,
        isAuth : function(){
            return window.sessionStorage.getItem('user')            
        } 
    }   
}
</script>