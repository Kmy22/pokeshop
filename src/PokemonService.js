
import {API_BACK} from './http-constants';

export default class ProductService {

  

	async getProducts() {
    const token = window.sessionStorage.getItem('token');
    const config = {headers: {'Authorization': `bearer${token}`}};
    
    API_BACK.get('/pokemonList', config)
    .then(response => {
        console.log(response.data);
    
    })
    .catch(e => {
        console.error(e);
    })



  }
}
