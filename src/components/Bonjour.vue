<template>
    <div id="bjr">             
        <div v-if="isAuth" style="">
            <h1> Bienvenue {{user2}}</h1>  
            <button class="p-button p-component p-button-raised p-button-danger p-mb-2" type="button" data-v-6edbeebf>
                <span class="p-button-label" @click="deconnexion">Déconnexion</span> 
            </button>
        </div> 
        <div v-else>
            <router-link to='/Connexion' style="margin-right:20px"> Connexion </router-link>
            <router-link to='/Inscription' style="margin-left:20px"> Inscription</router-link>
        </div>
        
    </div>   
</template>


<script>
export default {  
    el: '#bjr',
    computed: {
        user2 : function(){
            return window.sessionStorage.getItem('user')
        },
        isAuth : function(){
            return window.sessionStorage.getItem('user')            
        },
        deconnexion : function(){
            window.sessionStorage.removeItem('user')
            window.sessionStorage.removeItem('token')


            window.location.reload();
            return true
        }
    
    }   
   
}
</script>