
<template>
    <div>
        <div class="card">
            <h1> Panier commandé le {{datePanier}}. Prix total : {{prixTotPanier}} </h1>
            <DataTable ref="dt" :value="products" dataKey="id" >
                

                <Column style="width: 3rem" :exportable="false"></Column>
                <Column field="nom" header="Nom" :sortable="true" style="min-width:16rem"></Column>
                <Column field="description" header="Description" :sortable="true" style="min-width:16rem"></Column>
                
                <Column header="image">
                     <template #body="slotProps">
                        <!--<img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />-->
                        <img :src="'/PokemonImage/'+slotProps.data.image" class="ImagePokemon"/>
                    </template>
                </Column>                



                <Column field="dispo" header="Disponibilite" :sortable="true" style="min-width:16rem"></Column>
                <Column field="categorie" header="Categorie" :sortable="true" style="min-width:16rem"></Column>
                <Column field="quantite" header="Quantite" :sortable="true" style="min-width:16rem"></Column>
                <Column field="prix" header="Prix/u" :sortable="true" style="min-width:16rem"></Column>
                <Column field="prixTot" header="Prix total ligne" :sortable="true" style="min-width:16rem"></Column>
            </DataTable>
        </div>
	</div>
</template>

<script>
//import { FilterMatchMode } from 'primevue/api';
import {API_BACK} from '../http-constants';

export default {
    data() {
        return {
            products: null,
            product: {},
            filters: {},
            prixTotPanier: 0,
            datePanier : ""
        }
    },
    props: {
        //idPanierRoute: String
        //idPanierProps: String
    },
    created() {
        
        //this.getProducts(idPanierRoute);
        this.getProducts();
    },
    methods: {
        getProducts(){

            const token = window.sessionStorage.getItem('token');
            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };


            const idPanierDeMerde = this.$route.params.idPanierRoute

            API_BACK.get('/panier/'+idPanierDeMerde, config)
                .then(response => {
                    console.log(response);

                   
                    if (response.data.idPanier) {
                        this.prixTotPanier = response.data.prix
                        this.datePanier = response.data.date
                        API_BACK.get('/PokemonPanier/'+idPanierDeMerde, config)
                            .then(response => {
                                console.log(response);
                                this.products = response.data;
                            })
                            .catch(e => {
                                console.error("CRASH" + e);
                            })
                    }
                })
                .catch(e => {
                    console.error("CRASH" + e);
                })

        }
    }
}
</script>

<style lang="scss" scoped>
.Tabledemerde {
    width: 100%;
    text-align: center;
}
.ImagePokemon {
	width:100%;
    max-width:200px;
}
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>
