<template>

    <div class="card">
        <DataView :value="products" :layout="layout"  :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
                    </div>
                    <div class="col-6" style="text-align: right">
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
					<div class="product-list-item">
						<img :src="'/PokemonImage/'+slotProps.data.image" class="ImagePokemon"  style="cursor: pointer;" @click="ClicSurArticle(slotProps.data.id)"/>
						<div class="product-list-detail"  style="cursor: pointer;" @click="ClicSurArticle(slotProps.data.id)">
							<div class="product-name">{{slotProps.data.nom}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							<i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.categorie}}</span>
						</div>
						<div class="product-list-action">
							<span class="product-price">${{slotProps.data.prix}}</span>
							<Button icon="pi pi-shopping-cart" label="Ajouter au panier" :disabled="slotProps.data.dispo == '0'" @click="AjouteDansPanier(slotProps.data.id)"></Button>
							<span :class="'product-badge status-'+slotProps.data.dispo.toString().toLowerCase()">{{slotProps.data.dispo}}</span>
						</div>
					</div>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4">
				<!--<div style="cursor: pointer;" onclick="theFunction()">-->
					<div class="product-grid-item card">
						<div class="product-grid-item-top">
							<div>
								<i class="pi pi-tag product-category-icon"></i>
								<span class="product-category">{{slotProps.data.categorie}}</span>
							</div>
							<span :class="'product-badge status-'+slotProps.data.dispo.toString().toLowerCase()">{{slotProps.data.dipso}}</span>
						</div>
						<div class="product-grid-item-content" style="cursor: pointer;" @click="ClicSurArticle(slotProps.data.id)">
							<!--<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.nom"/>-->
							<!--<img :src="'../../PokemonImage/'+slotProps.data.image" :alt="'ça marche pas putain'"/>-->
							<!--<img :src="require(`../assets/PokemonImage/${slotProps.data.image}`)"/>-->
							<!--<img :src="getImgUrl(slotProps.data.image)"/>-->
							<img :src="'/PokemonImage/'+slotProps.data.image" class="ImagePokemon"/>
							<!--<img src="../../PokemonImage/evoli.png" :alt="'ça marche pas putain'"/>  CA CA MARCHE-->
							<!--<img src="C:\\Users\\tangi\\Desktop\\Cours\\JEE\\projet\\PokeShop\\pokeshop\\PokemonImage\\evoli.png" :alt="slotProps.data.image"/>-->
							<div class="product-name">{{slotProps.data.nom}}</div>
							<div class="product-description">{{slotProps.data.description}}</div>
							
						</div>
						<div class="product-grid-item-bottom">
							<span class="product-price">${{slotProps.data.prix}}</span>
							<Button icon="pi pi-shopping-cart" :disabled="slotProps.data.dispo === 'false'" @click="AjouteDansPanier(slotProps.data.id)"></Button>
						</div>
					</div>
				</div>
			</template>
		</DataView>
		
	</div>
</template>

<script>
//import PokemonService from '../PokemonService.js';
import {API_BACK} from '../http-constants';

export default {
    data() {
        return {
            products: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Prix décroissant', value: '!prix'},
                {label: 'Prix croissant', value: 'prix'},
            ]
        }
    },
    productService: null,
    created() {
        //this.pokemonService = new PokemonService();
		/*this.getProducts().then(data => {
			console.log("BOUTIQUE" + data)
			this.products = data
		});*/
		this.getProducts();
    },
    mounted() {
        //this.pokemonService.getProducts().then(data => {
		/*this.getProducts().then(data => {
			console.log("BOUTIQUE" + data)
			this.products = data
		});*/
		//this.products = this.getProducts();
		//console.log("BOUTIQUE" + this.getProducts());
    },
	methods:{
        getProducts(){

            const token = window.sessionStorage.getItem('token');
            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };

            // #### TEST Temporaire pour validation requete sur back

            API_BACK.get('/pokemonList', config)
                .then(response => {
                    console.log(response);
					this.products = response.data;
                    return response.data
                })
                .catch(e => {
                    console.error("CRASH" + e);
					return null;
                })
        },
		onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

			console.log("VALUE" + JSON.stringify(value));
			console.log("SORTVALUE" + JSON.stringify(sortValue));

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
		AjouteDansPanier(idPokemon){
			

			const token = window.sessionStorage.getItem('token');

			//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6Miwibm9tIjoiUGlsbGlwZSIsIm1kcCI6IjliMWRiNjU3NGI3MWM0OGJjOTk2Yjc1MzY0MzdkNGQ1NzAzOWVmYjQwMTEwYzM5MDRiY2YzZjMzMzU1NzM2ZTI0ZmQwOTMyNzQzNjcyNTljNTYyMGVjNTRjYTMwZDRjZWU1YjZiZmRmOTlmY2M4NWE3MDY0YjBlYzVjY2I0NzYzIiwibWFpbCI6InBoaWxsaXBlLmxhZG1pbkBnbWFpbC5jb20iLCJhZG1pbiI6MSwiaWF0IjoxNjQyMTcxMjAzfQ.O2p4n7zAEGDllwkFr9VkvAjIRTjAvI010_p3n3k9lQY'


            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };


			console.log("AJOUTE DANS PANIER " + token);

            // #### TEST Temporaire pour validation requete sur back

            API_BACK.post('/ajoutePokemonPanier/'+idPokemon+'/1', null,config)
                .then(response => {
                    console.log(response);
					
					
                })
                .catch(e => {
                    console.error("CRASH" + e);
                })

		},
		ClicSurArticle(idPokemon){
			console.log(idPokemon)
			// Go sur la page article tout seul avc les commentaires et notes, sans doute passer l'id de larticle via le routeur
			this.$router.push({ name: 'Article', params: {idPokemon: idPokemon }})
		}
    }
}
</script>

<style lang="scss" scoped>
.ImagePokemon {
	width:100%;
    max-width:200px;
}
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.product-grid-item-content {
		text-align: center;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>
