const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from this file

describe('User Controller Integration Tests', () => {
  test('should create user successfully', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('message', 'User created successfully.');
    expect(response.body.user).toMatchObject(newUser);
  });

  test('should return 400 when name is missing', async () => {
    const newUser = {
      email: 'john.doe@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Name is required.');
  });

  test('should return 400 when email is missing', async () => {
    const newUser = {
      name: 'John Doe'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error', 'Email is required.');
  });
});