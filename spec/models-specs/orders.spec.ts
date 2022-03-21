import OrdersStore from "../../src/api/models/orders"
import UsersStore from '../../src/api/models/users';
import ProductStore from '../../src/api/models/products';
import { Order } from '../../src/api/interfaces/order';
import ProductsStore from "../../src/api/models/products";

const order: OrdersStore = new OrdersStore();

describe('Order Model', () => {
  it('should have an getOrderByUserID  method', () => {
    expect(order.getOrderByUserID).toBeDefined();
  });
  it('should have a updateOrder method', () => {
    expect(order.updateOrder).toBeDefined();
  });
  it('should have a index method', () => {
    expect(order.index).toBeDefined();
  });
  it('should have a deleteOrder method', () => {
    expect(order.deleteOrder).toBeDefined();
  });
  it('should have a createOrder method', () => {
    expect(order.createOrder).toBeDefined();
  });
  describe('Manipulate Order methods', () => {
    const user = new UsersStore();
    const product = new ProductsStore();

    beforeAll(async () => {
      await user.createUser({
        firstname: 'userfirst',
        lastname: 'userlast',
        password: 'passw'
      });
      await product.createProduct({
        name: 'prod',
        price: '60',
      });
    });
    afterAll(async () => {
      await user.deleteUser(1);
      await product.deleteProduct(1);
    });

    it('should create order using createOrder method', async () => {
      const result: Order = await order.createOrder({
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'active'
      });
      expect(result).toEqual({
        id: 1,
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'active'
      });
    });
    it('should return all orders of user using index method', async () => {
      const result: Order[] = await order.index();
      expect(result).toEqual([
        {
          id: 1,
          product_id: 1,
          quantity: 5,
          user_id: 1,
          status: 'active'
        }
      ]);
    });
    it('should return current order of user using getOrderByUserId method', async () => {
      const result: Order = await order.getOrderByUserID(1);
      expect(result).toEqual({
        id: 1,
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'active'
      });
    });
    it('should update order status using updateOrder method', async () => {
      const result: Order = await order.updateOrder(
        1,
        'complete'
      );
      expect(result).toEqual({
        id: 1,
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'complete'
      });
    });
    it('should delete the correct order', async () => {
      const result: Order = await order.deleteOrder(1);
      expect(result).toEqual({
        id: 1,
        product_id: 1,
        quantity: 5,
        user_id: 1,
        status: 'complete'
      });
    });
  });
});