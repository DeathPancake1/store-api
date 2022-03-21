import supertest from "supertest";
import { server } from '../../src/server';
import ProductsStore from "../../src/api/models/products";


const request = supertest(server);
const token :string = process.env.TEST_TOKEN as string;

describe('Test endpoint for product', ()=>{
    beforeAll(() => {
        spyOn(ProductsStore.prototype, 'createProduct').and.returnValue(
            Promise.resolve(
              {
                id: 1,
                name: 'prod',
                price: '70',
              }
            )
        );
        spyOn(ProductsStore.prototype, 'index').and.returnValue(
            Promise.resolve([
              {
                id: 1,
                name: 'prod',
                price: '70',
              }
            ])
        );
        spyOn(ProductsStore.prototype, 'getProduct').and.returnValue(
            Promise.resolve(
              {
                id: 1,
                name: 'prod',
                price: '70',
              }
            )
        );
        spyOn(ProductsStore.prototype, 'deleteProduct').and.returnValue(
            Promise.resolve(
              {
                id: 1,
                name: 'prod',
                price: '70',
              }
            )
        );
    })
    it('should create a product using post /product/:product', async (done) => {
        const res = await request
          .post('/products')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                name: 'prod',
                price: '70',
              }
        )
        done()
    });
    it('should get all products using post /product/', async (done) => {
        const res = await request
          .get('/products')
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            [{
                id: 1,
                name: 'prod',
                price: '70',
              }]
        )
        done()
    });
    it('should get a product using post /product/:id', async (done) => {
        const res = await request
          .get('/products/1')
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                name: 'prod',
                price: '70',
              }
        )
        done()
    });
    it('should delete a product using post /product/:id', async (done) => {
        const res = await request
          .delete('/products/1')
          .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
            {
                id: 1,
                name: 'prod',
                price: '70',
              }
        )
        done()
    });
})