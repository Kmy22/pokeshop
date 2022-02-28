
import {API_BACK} from './http-constants';

export default class ProductService {

  
    //async getProducts() {
	getProducts() {
    //const token = window.sessionStorage.getItem('token');
    //const config = {headers: {'Authorization': `bearer${token}`}};
    
    const token = window.sessionStorage.getItem('token');
    const config = {headers: {'Authorization': `bearer ${token}`}};


    API_BACK.get('/pokemonList', config)
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(e => {
        console.error(e);
        return null;
    })



  }
}
