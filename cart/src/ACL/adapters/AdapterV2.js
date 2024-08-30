export default class AdapterV2{
    constructor(api) {
        this.api = api;
      }
    
      async fetchProducts() {
        const response = await this.api();
        return this.transformProductData(response);
      }
    
      transformProductData(data) {
        return data.map(item => ({...item, price: Math.ceil(item.price * 83), currency: "INR", version: "2" // this will show discount tag on the cart when version is 2
        }));
      }
}