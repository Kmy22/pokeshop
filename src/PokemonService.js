
export default class ProductService {

  

	getProducts() {
		return fetch('pokemon.json').then(res => res.json()).then(d => d.data);
    }


}
