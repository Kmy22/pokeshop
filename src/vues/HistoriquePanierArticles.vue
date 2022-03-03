
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



                <Column field="dispo" header="Disponibilite" :sortable="true" style="min-width:10rem"></Column>
                <Column field="categorie" header="Categorie" :sortable="true" style="min-width:15rem"></Column>
                <Column field="quantite" header="Quantite" :sortable="true" style="min-width:15rem"></Column>
                <Column field="prix" header="Prix/u" :sortable="true" style="min-width:15rem"></Column>
                <Column field="prixTot" header="Prix total ligne" :sortable="true" style="min-width:16rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="ajouteComm(slotProps.data.idPokemon)" />
                    </template>
                </Column>
            </DataTable>
        </div>








        <Dialog :visible="commentaireDialog" :style="{width: '450px'}" header="Ajout d'un commentaire" :modal="true" class="p-fluid">
           
           <div class="field">
                <label for="Note">Note</label>
                <Rating v-model=commentaire.note :cancel="false"/>
            </div>

            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="commentaire.description" required="true" rows="3" cols="20" />
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveComm" />
            </template>
        </Dialog>












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
            datePanier : "",
            commentaireDialog: false,
            commentaire: {},
            idPokemonSelect: null
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

        },
        ajouteComm(idPokemon)
        {
            console.log(idPokemon)
            this.idPokemonSelect = idPokemon
            this.commentaireDialog = true
        },
        hideDialog(){
            this.commentaireDialog = false,
            this.idPokemonSelect = null
        },
        saveComm(){
            console.log(this.commentaire.note)
            console.log(this.commentaire.description)



            const token = window.sessionStorage.getItem('token');
            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };
            const body = {
                avis: this.commentaire.description,
                note: this.commentaire.note
            };



            API_BACK.post('/ajouteAvisPokemon/'+this.idPokemonSelect, body, config)


                .then(response => {
                    console.log(response);
                })
                .catch(e => {
                    console.error("CRASH" + e);
                })



            this.commentaireDialog = false;
            this.commentaire = {};

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
