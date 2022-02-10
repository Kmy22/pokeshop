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


<template #list="slotProps">
	<div class="col-12">
        <div class="pokemon-details">
            <div>
                <img :src="'PokemonImage/' + slotProps.data.image + '.png'" :alt="slotProps.data.image"/>
                <div class="grid">
                    <div class="col-12">id: <b>{{slotProps.data.id}}</b></div>
                    <div class="col-12">Description: <b>{{slotProps.data.description}}</b></div>
                    <div class="col-12">Nom: <b>{{slotProps.data.nom}}</b></div>
                    <div class="col-12">prix: <b>{{slotProps.data.prix}}</b></div>
                </div>
            </div>
            <Button icon="pi pi-search"></Button>
        </div>
    </div>
</template>
<template #grid="slotProps">
	<div style="padding: .5em" class="col-12 md:col-3">
		<Panel :header="slotProps.data.id" style="text-align: center">
			<img :src="'PokemonImage/' + slotProps.data.nom + '.png'" :alt="slotProps.data.nom"/>
			<div class="pokemon-detail">{{slotProps.data.description}} - {{slotProps.data.prix}}</div>
			<Button icon="pi pi-search"></Button>
		</Panel>
	</div>
</template>

<template #header>Header Content</template>
<template #footer>Footer Content</template>
<template #empty>No records found.</template>

<DataView :value="pokemons" :layout="layout">
	<template #header>
		<DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
	</template>
	<template #list="slotProps" >
		<div>id: <b>{{slotProps.data.id}}</b></div>
	</template>
	<template #grid="slotProps">
		<div>id: <b>{{slotProps.data.id}}</b></div>
	</template>
</DataView>

