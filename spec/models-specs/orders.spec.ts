import OrdersStore from "../../src/api/models/orders"
import UsersStore from '../../src/api/models/users';
import { Order } from "../../src/api/models/orders"
import ProductsStore from "../../src/api/models/products";
import { Client } from "../../src/api/database";

const order: OrdersStore = new OrdersStore();

describe('Order Model', () => {
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
      const conn = await Client.connect()
      let sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      conn.release()
    });

    it('should create order using createOrder method', async () => {
      const result: Order = await order.createOrder({
        user_id: 1,
        status: 'active'
      });
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'active'
      });
    });
    it('should return all orders of user using index method', async () => {
      const result: Order[] = await order.index();
      expect(result).toEqual([
        {
          id: 1,
          user_id: 1,
          status: 'active'
        }
      ]);
    });
    it('should return current order of user using getOrderByUserId method', async () => {
      const result: Order = await order.getOrderByUserID(1);
      expect(result).toEqual({
        id: 1,
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
        user_id: 1,
        status: 'complete'
      });
    });
    it('should delete the correct order', async () => {
      const result: Order = await order.deleteOrder(1);
      expect(result).toEqual({
        id: 1,
        user_id: 1,
        status: 'complete'
      });
    });
  });
});