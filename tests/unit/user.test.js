const { createUser } = require('../../controllers/userController');
const { User } = require('../../models');

jest.mock('../../models', () => ({
  User: {
    create: jest.fn()
  }
}));

describe('User Controller', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('should create user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    mockRequest.body = userData;

    const createdUser = { id: 1, ...userData };
    User.create.mockResolvedValue(createdUser);

    await createUser(mockRequest, mockResponse);

    expect(User.create).toHaveBeenCalledWith(userData);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User created successfully.',
      user: createdUser
    });
  });

  test('should return 400 when name is missing', async () => {
    mockRequest.body = { email: 'john@example.com' };

    await createUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Name and email are required.'
    });
  });

  test('should return 400 when email is missing', async () => {
    
    mockRequest.body = { name: 'John Doe' };

    await createUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Name and email are required.'
    });
  });

  test('should handle database errors', async () => {
    mockRequest.body = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const error = new Error('Database error');
    User.create.mockRejectedValue(error);

    await createUser(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Error creating user.',
      error: error.message
    });
  });
});
