<template>
    <div id="bjr">
        <h1> Ceci est l'historique des paniers </h1>
        <Button label="Test req" icon = "pi pi-user" @click="test"></Button>
    </div>
</template>


<script>
import {API_BACK} from '../http-constants';

export default { 
    methods:{
        test(){

            const token = window.sessionStorage.getItem('token');
            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };


            // #### TEST Temporaire pour validation requete sur back

            API_BACK.get('/pokemonList', config)
                .then(response => {
                    console.log(response);
                    
                })
                .catch(e => {
                    console.error("CRASH" + e);
                })
        }
    }
}
</script>

