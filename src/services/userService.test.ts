import { UserService } from './userService'; // Je service die je wilt testen

describe('UserService', () => {
  it('should create a new user', async () => {
    const user = await UserService.createUser('JohnDoesddctg', 'john.dofedcrg@example.com', 'password123');
    expect(user.username).toBe('JohnDoesddctg');
  });

  it('should fetch all users', async () => {
    const users = await UserService.getAllUsers();
    expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThan(0);
  });
});
