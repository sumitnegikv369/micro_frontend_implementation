// adapter to interact with the data source
export class ProductService {
    constructor(api) {
      this.api = api;
    }
  
    async fetchProducts() {
      const response = await this.api();
      return this.transformProductData(response);
    }
  
    transformProductData(data) {
      return data.map(item => ({...item, price: Math.ceil(item.price * 83), currency: "INR"
      }));
    }
  }