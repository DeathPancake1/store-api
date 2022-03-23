import OrdersStore from "../../src/api/models/orders"
import UsersStore from '../../src/api/models/users';
import { OrderProducts } from "../../src/api/models/order_products";
import OrderProductsStore from "../../src/api/models/order_products";
import ProductsStore from "../../src/api/models/products";
import { Client } from "../../src/api/database"

const orderProd: OrderProductsStore = new OrderProductsStore();

  describe('Manipulate Order_Products methods', () => {
    const user = new UsersStore();
    const product = new ProductsStore();
    const order = new OrdersStore();

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
      await order.createOrder({
        user_id: 1,
        status: 'active'
      });
    });
    afterAll(async () => {
      await user.deleteUser(1);
      await product.deleteProduct(1);
      await order.deleteOrder(1);
      const conn = await Client.connect()
      let sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n'
      await conn.query(sql)
      conn.release()
    });

    it('should create order product using createOrderProducts method', async () => {
      const result: OrderProducts = await orderProd.createOrderProducts({
        order_id: 1,
        quantity: 5,
        product_id: 1,
      });
      expect(result).toEqual({
        id: 1,
        order_id: 1,
        quantity: 5,
        product_id: 1,
      });
    });
    it('should return all orders of user using index method', async () => {
      const result: OrderProducts[] = await orderProd.index();
      expect(result).toEqual([
        {
          id: 1,
          order_id: 1,
          quantity: 5,
          product_id: 1
        }
      ]);
    });
    it('should return current order of user using getOrderByUserId method', async () => {
      const result: OrderProducts[] = await orderProd.getOrderProdByOrderID(1)
      expect(result).toEqual([{
        id: 1,
        order_id: 1,
        quantity: 5,
        product_id: 1,
      }]);
    });
    it('should delete the correct order', async () => {
      const result: OrderProducts = await orderProd.deleteOrderProducts(1);
      expect(result).toEqual({
        id: 1,
        order_id: 1,
        quantity: 5,
        product_id: 1,
      });
    });
});