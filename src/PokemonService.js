
import {API_BACK} from './http-constants';

export default class ProductService {

  

	async getProducts() {
		API_BACK.get('/pokemonList')
        .then(response => {
          console.log(response);

        })
        .catch(e => {
          console.error(e);

      })
    }



}
