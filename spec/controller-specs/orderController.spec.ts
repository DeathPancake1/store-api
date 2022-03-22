import supertest from 'supertest';
import OrdersStore from '../../src/api/models/orders';
import { server } from '../../src/server';

const request = supertest(server);
const token: string = process.env.TEST_TOKEN as string;

describe('Test endpoint for product', ()=>{
    beforeAll(() => {
        spyOn(OrdersStore.prototype, 'createOrder').and.returnValue(
            Promise.resolve(
              {
                id: 1,
                user_id: 1,
                status: 'active'
              }
            )
        );
        spyOn(OrdersStore.prototype, 'index').and.returnValue(
            Promise.resolve([
                {
                    id: 1,
                    user_id: 1,
                    status: 'active'
                }
            ])
        );
        spyOn(OrdersStore.prototype, 'getOrderByUserID').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    user_id: 1,
                    status: 'active'
                }
            )
        );
        spyOn(OrdersStore.prototype, 'updateOrder').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    user_id: 1,
                    status: 'complete'
                }
            )
        );
        spyOn(OrdersStore.prototype, 'deleteOrder').and.returnValue(
            Promise.resolve(
                {
                    id: 1,
                    user_id: 1,
                    status: 'active'
                }
            )
        );
    })
    it('should create an order using post /order/:order', async (done) => {
        const res = await request
          .post('/orders')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                user_id: 1,
                status: 'active'
            }
        )
        done()
    });
    it('should get all orders using get /order/', async (done) => {
        const res = await request
          .get('/orders')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            [{
                id: 1,
                user_id: 1,
                status: 'active'
            }]
        )
        done()
    });
    it('should get an order using get /order/:id', async (done) => {
        const res = await request
          .get('/orders/1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                user_id: 1,
                status: 'active'
            }
        )
        done()
    });
    it('should update an order using put /order/:id', async (done) => {
        const res = await request
          .put('/orders?status=complete&orderId=1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                user_id: 1,
                status: 'complete'
            }
        )
        done()
    });
    it('should delete an order using delete /order/:id', async (done) => {
        const res = await request
          .delete('/orders/1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                user_id: 1,
                status: 'active'
            }
        )
        done()
    });
})