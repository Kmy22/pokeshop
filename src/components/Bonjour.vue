<template>
    <div id="bjr">
        <!--<h1 v-if="isAuth"> Bienvenue {{user}}</h1>
        <router-link v-else to='/Connexion'> Connexion</router-link>-->
        <h1> Bienvenue {{user2}}</h1>
        <router-link to='/Connexion'> Connexion</router-link>
    </div>
</template>


<script>
export default {  
    el: '#bjr',
    data() {
        return {
            user : window.sessionStorage.getItem('user')
        }
    },
    computed: {
        user2 : function(){
            return window.sessionStorage.getItem('user')
        } 
    }
    /*mounted() {
        if (window.sessionStorage.getItem('user')) {
            this.user = window.sessionStorage.getItem('user');
        }
    },
    watch: {
        user(newUser) {
        window.sessionStorage.setItem('user', newUser);
        }
    }*/
}
</script>