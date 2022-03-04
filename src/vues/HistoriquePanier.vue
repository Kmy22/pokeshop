
<template>
    <div>
        <div class="card">
            <h1> Historique des commandes  </h1>
            <DataTable ref="dt" :value="products" dataKey="id" >
                

                <Column style="width: 3rem" :exportable="false"></Column>
                <Column field="date" header="Date de commande" :sortable="true" style="min-width:16rem"></Column>
                <Column field="prix" header="Prix ($)" :sortable="true" style="min-width:16rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <!--<Button icon="pi pi-eye" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />-->
                        <router-link :to="{ name: 'HistoriquePanierArticles', params: {idPanierRoute: slotProps.data.idPanier }}">Contenu Panier</router-link>
                        <!-- todo par sur que ça marche-->
                    </template>
                </Column>
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
            //submitted: false,
        }
    },
    //productService: null,
    created() {
        //this.productService = new ProductService();
        //this.initFilters();
        this.getProducts();
    },
    mounted() {
        //this.productService.getProducts().then(data => this.products = data);
    },
    methods: {
        /*formatCurrency(value) {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        },*/
        /*initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }*/
        getProducts(){

            const token = window.sessionStorage.getItem('token');
            const config = {
                headers: {'Authorization': `bearer ${token}`}
            };


            API_BACK.get('/HistoriquePanier', config)
                .then(response => {
                    console.log(response);

                    this.products = response.data;
                    
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
