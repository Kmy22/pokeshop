import DataView from 'primevue/dataview';

export default {
    data() {
        return {
            pokemons: null,
        }
    },
    pokemonsService: null,
    created() {
        this.pokemonsService = new PokemonService();
    },
    mounted() {
          this.pokemonsService.then(data => this.pokemons = data);
    }
}


