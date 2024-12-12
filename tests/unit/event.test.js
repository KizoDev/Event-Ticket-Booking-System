const { createEvent } = require('../../controllers/eventController');
const { Event } = require('../../models');

jest.mock('../../models', () => ({
  Event: {
    create: jest.fn(),
    findByPk: jest.fn()
  }
}));

describe('Event Controller', () => {
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

  test('should create event successfully', async () => {
    const eventData = {
      name: 'John',
      totalTickets:100,
      availableTickets:100
    };
    mockRequest.body = eventData;

    const createdEvent = { id: 1, ...eventData };
    Event.create.mockResolvedValue(createdEvent);

    // Act
    await createEvent(mockRequest, mockResponse);

    // Assert
    expect(Event.create).toHaveBeenCalledWith(eventData);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Event created successfully.',
      event: createdEvent
    });
  });

  test('should return 400 when name is missing', async () => {
    // Arrange
    mockRequest.body = { totalTickets: 100 };

    // Act
    await createEvent(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Event name and total tickets are required."
    });
  });

  test('should return 400 when totalTickets is missing', async () => {
    // Arrange
    mockRequest.body = { name: 'class' };

    // Act
    await createEvent(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Event name and total tickets are required."
    });
  });

  test('should handle database errors', async () => {
    // Arrange
    mockRequest.body = {
      name: 'John Doe',
      totalTickets: 100
    };

    const error = new Error('Database error');
    Event.create.mockRejectedValue(error);

    // Act
    await createEvent(mockRequest, mockResponse);

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Error creating event.',
      error: error.message
    });
  });
});
