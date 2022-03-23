import supertest from 'supertest';
import OrderProductsStore from '../../src/api/models/order_products';
import { server } from '../../src/server';

const request = supertest(server);
const token: string = process.env.TEST_TOKEN as string;

describe('Test endpoint for product', ()=>{
    it('should create an order product using post /orderProducts/:orderProd', async (done) => {
        spyOn(OrderProductsStore.prototype, 'createOrderProducts').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    order_id: 1,
                    quantity: 1,
                    product_id: 1,
                }
            )
        );
        const res = await request
          .post('/orderProducts')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                order_id: 1,
                quantity: 1,
                product_id: 1,
            }
        )
        done()
    });
    it('should get all order products using get /orderProducts/', async (done) => {
        spyOn(OrderProductsStore.prototype, 'index').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    order_id: 1,
                    quantity: 1,
                    product_id: 1,
                }
            ])
        );
        const res = await request
          .get('/orderProducts')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            [{
                id: 1,
                order_id: 1,
                quantity: 1,
                product_id: 1,
            }]
        )
        done()
    });
    it('should get an order products using get /orderProducts/:id', async (done) => {
        spyOn(OrderProductsStore.prototype, 'getOrderByID').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    order_id: 1,
                    quantity: 1,
                    product_id: 1,
                }
            )
        );
        const res = await request
          .get('/orderProducts/1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                order_id: 1,
                quantity: 1,
                product_id: 1,
            }
        )
        done()
    });
    it('should delete an order products using get /orderProducts/:id', async (done) => {
        spyOn(OrderProductsStore.prototype, 'deleteOrderProducts').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    order_id: 1,
                    quantity: 1,
                    product_id: 1,
                }
            )
        );
        const res = await request
          .delete('/orderProducts/1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                order_id: 1,
                quantity: 1,
                product_id: 1,
            }
        )
        done()
    });
})