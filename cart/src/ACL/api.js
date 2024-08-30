import AdapterV1 from './adapters/AdapterV1';
import AdapterV2 from './adapters/AdapterV2';
import { apiVersion } from "shell/public-api";


async function getAdapterForVersion() {
  const version = apiVersion;
  console.log(version)

  switch (version) {
    case '1.0.0':
    case '1.1.0':
      return AdapterV1;
    case '1.2.0':
    case '1.3.0':
      return AdapterV2;
    default:
      throw new Error('Unsupported version');
  }
}

export async function fetchProducts(api) {
  const Adapter = await getAdapterForVersion();

  const adapterInstance = new Adapter(api);

  const products = await adapterInstance.fetchProducts();

  return products;
};