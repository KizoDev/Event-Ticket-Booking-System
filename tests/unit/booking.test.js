const { bookTicket, cancelBooking } = require('../../controllers/bookingController');
const { Booking, Event, WaitingList, User } = require('../../models');
const sequelize = require('../../config/db');
const { v4: uuidv4 } = require('uuid');

// Mock the models and sequelize transaction
jest.mock('../../models', () => ({
  Booking: {
    create: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn()
  },
  Event: {
    findByPk: jest.fn(),
    save: jest.fn()
  },
  WaitingList: {
    count: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn()
  },
  User: {
    findByPk: jest.fn()
  }
}));

jest.mock('../../config/db', () => ({
  transaction: jest.fn(() => ({
    commit: jest.fn(),
    rollback: jest.fn()
  }))
}));

describe('Booking Controller', () => {
  let mockRequest;
  let mockResponse;
  let transaction;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    transaction = sequelize.transaction();
  });

  describe('bookTicket', () => {
    test('should create a booking ticket successfully', async () => {
      const requestBody = { userId: uuidv4(), eventId: uuidv4() };
      mockRequest.body = requestBody;

      User.findByPk.mockResolvedValue({ id: requestBody.userId });
      Event.findByPk.mockResolvedValue({ id: requestBody.eventId, availableTickets: 10, save: jest.fn() });
      Booking.create.mockResolvedValue({ id: uuidv4(), ...requestBody });

      await bookTicket(mockRequest, mockResponse);

      expect(User.findByPk).toHaveBeenCalledWith(requestBody.userId);
      expect(Event.findByPk).toHaveBeenCalledWith(requestBody.eventId, { transaction });
      expect(Booking.create).toHaveBeenCalledWith(requestBody, { transaction });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Ticket booked successfully.',
        booking: expect.objectContaining({ userId: requestBody.userId, eventId: requestBody.eventId })
      });
    });

    test('test_add_to_waiting_list_when_no_tickets', async () => {
      const requestBody = { userId: uuidv4(), eventId: uuidv4() };
      mockRequest.body = requestBody;

      User.findByPk.mockResolvedValue({ id: requestBody.userId });
      Event.findByPk.mockResolvedValue({ id: requestBody.eventId, availableTickets: 0 });
      WaitingList.count.mockResolvedValue(0);
      WaitingList.create.mockResolvedValue({ id: uuidv4(), ...requestBody, position: 1 });

      await bookTicket(mockRequest, mockResponse);

      expect(WaitingList.create).toHaveBeenCalledWith(
        { userId: requestBody.userId, eventId: requestBody.eventId, position: 1 },
        { transaction }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Added to waiting list.',
        waitingUser: expect.objectContaining({ userId: requestBody.userId, eventId: requestBody.eventId, position: 1 })
      });
    });
  });

  describe('cancelBooking', () => {
    test('test_cancel_booking_successfully', async () => {
      const requestBody = { bookingId: uuidv4() };
      mockRequest.body = requestBody;

      Booking.findByPk.mockResolvedValue({ id: requestBody.bookingId, eventId: uuidv4(), destroy: jest.fn() });
      Event.findByPk.mockResolvedValue({ id: uuidv4(), availableTickets: 10, save: jest.fn() });
      WaitingList.findOne.mockResolvedValue(null);

      await cancelBooking(mockRequest, mockResponse);

      expect(Booking.findByPk).toHaveBeenCalledWith(requestBody.bookingId, { transaction });
      expect(Booking.findByPk().destroy).toHaveBeenCalledWith({ transaction });
      expect(Event.findByPk().save).toHaveBeenCalledWith({ transaction });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Booking cancelled successfully.'
      });
    });
  });
});
