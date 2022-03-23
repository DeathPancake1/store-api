import ProductsStore from "../../src/api/models/products";
import { Product } from "../../src/api/models/products";

const product: ProductsStore = new ProductsStore();

describe('Product Model', () => {
  it('should create a product using create method', async () => {
    const result: Product = await product.createProduct({
      name: 'prod',
      price: '60',
    });
    expect(result).toEqual({
      id: 1,
      name: 'prod',
      price: '60',
    });
  });
  it('should return a list of products using index', async () => {
    const result: Product[] = await product.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'prod',
        price: '60',
      }
    ]);
  });

  it('should return the correct product using getProduct', async () => {
    const result: Product = await product.getProduct(1);
    expect(result).toEqual({
      id: 1,
      name: 'prod',
      price: '60',
    });
  });
  it('should delete the correct product using deleteProduct', async () => {
    const result: Product = await product.deleteProduct(1);
    expect(result).toEqual({
      id: 1,
      name: 'prod',
      price: '60',
    });
  });
});