import UsersStore from "../../src/api/models/users";
import supertest from "supertest";
import { server } from '../../src/server';


const request = supertest(server);
const token :string = process.env.TEST_TOKEN as string;


describe('Test endpoint responses', () => {
    beforeAll(() => {
        spyOn(UsersStore.prototype, 'createUser').and.returnValue(
            Promise.resolve({
                auth : true,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJwcm9kMiIsImxhc3RuYW1lIjoiNjAiLCJwYXNzd29yZCI6InBhc3MifQ.zo3dDYaQorReOU04__S1yZDK5G8yUopxU0axZ-GWT3M'
            })
        )
        spyOn(UsersStore.prototype, 'index').and.returnValue(
            Promise.resolve([{
                id: 1,
                firstname: 'prod',
                lastname: '60',
                password: 'pass'
              }])
        )
        spyOn(UsersStore.prototype, 'getUser').and.returnValue(
            Promise.resolve({
                id: 1,
                firstname: 'prod',
                lastname: '60',
                password: 'pass'
              })
        )
        spyOn(UsersStore.prototype, 'deleteUser').and.returnValue(
            Promise.resolve({
                id: 1,
                firstname: 'prod',
                lastname: '60',
                password: 'pass'
              })
        )
    });
  it('should get all users using /user/', async (done) => {
    const res = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
        [{
            id: 1,
            firstname: 'prod',
            lastname: '60',
            password: 'pass'
        }]
    )
    done()
  });
  it('should create a user using post /user/:user', async (done) => {
    const res = await request
      .post('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.auth).toBe(true)
    expect(res.body.token).toBeDefined();
    done()
  });

  it('should get a user using /user/:id', async (done) => {
    const res = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token);
      expect(res.body).toEqual(
        {
            id: 1,
            firstname: 'prod',
            lastname: '60',
            password: 'pass'
        }
    )
    done()
  });

  it('should delete a user using /user/:id', async (done) => {
    const res = await request
      .delete('/users/1')
      .set('Authorization', 'Bearer ' + token);
      expect(res.body).toEqual(
        {
            id: 1,
            firstname: 'prod',
            lastname: '60',
            password: 'pass'
        }
    )
    done()
  });
});