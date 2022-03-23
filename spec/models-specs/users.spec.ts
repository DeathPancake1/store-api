import UsersStore from "../../src/api/models/users";
import { User , UserAuth } from "../../src/api/models/users";

const user: UsersStore = new UsersStore();

describe('User Model', () => {
  it('should create a user using create method', async () => {
    const result: UserAuth = await user.createUser({
      firstname: 'user1',
      lastname: 'last',
      password: 'passw'
    });
    expect(result.auth).toEqual(true);
    expect(result.token).toBeDefined();
  });
  it('should return a list of users using index', async () => {
    const result: User[] = await user.index();
    expect(result).toHaveSize(1);
    expect(result[0].id).toEqual(1);
    expect(result[0].firstname).toEqual('user1');
    expect(result[0].lastname).toEqual('last');
    expect(result[0].password).not.toEqual('passw');
  });

  it('should return the correct user using getUser', async () => {
    const result: User = await user.getUser(1);
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('user1');
    expect(result.lastname).toEqual('last');
    expect(result.password).not.toEqual('passw');
  });
  it('should delete the correct user using deleteUser', async () => {
    const result: User = await user.deleteUser(1);
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('user1');
    expect(result.lastname).toEqual('last');
    expect(result.password).not.toEqual('passw');
  });
});