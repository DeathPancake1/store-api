import ProductsStore from "../../src/api/models/products";
import { Product } from "../../src/api/interfaces/product";

const product: ProductsStore = new ProductsStore();

describe('Product Model', () => {
  it('should have a method to create a product', () => {
    expect(product.createProduct).toBeDefined();
  });
  it('should have a method to get a product', () => {
    expect(product.getProduct).toBeDefined();
  });
  it('should have a method to index all products', () => {
    expect(product.index).toBeDefined();
  });
  it('should have a method to delete a product', () => {
    expect(product.deleteProduct).toBeDefined();
  });
  it('should create a product using create method', async () => {
    const result: Product = await product.createProduct({
      name: 'prod',
      price: '60',
    });
    expect(result).toEqual({
      id: 2,
      name: 'prod',
      price: '60',
    });
  });
  it('should return a list of products using index', async () => {
    const result: Product[] = await product.index();
    expect(result).toEqual([
      {
        id: 2,
        name: 'prod',
        price: '60',
      }
    ]);
  });

  it('should return the correct product using getProduct', async () => {
    const result: Product = await product.getProduct(2);
    expect(result).toEqual({
      id: 2,
      name: 'prod',
      price: '60',
    });
  });
  it('should delete the correct product using deleteProduct', async () => {
    const result: Product = await product.deleteProduct(2);
    expect(result).toEqual({
      id: 2,
      name: 'prod',
      price: '60',
    });
  });
});