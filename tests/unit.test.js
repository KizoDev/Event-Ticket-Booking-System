const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const Event = require('../models').Event;
const Booking = require('../models').Booking;
const WaitingList = require('../models').WaitingList;

beforeAll(() => {
  jest.setTimeout(80000);
});

beforeEach(async () => {
  try {
    await sequelize.sync({ force: true }); 
  } catch (error) {
    console.error("Error syncing database:", error);
    throw error; 
  }
});

describe('Unit Tests for Event Ticket Booking System', () => {

  // Unit Test for creating an event
  describe('POST /initialize', () => {
    it('should create an event with available tickets', async () => {
      const response = await request(app)
        .post('/initialize')
        .send({ name: 'Concert', totalTickets: 100, availableTickets: 100 });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Concert');
      expect(response.body.totalTickets).toBe(100);
      expect(response.body.availableTickets).toBe(100);
    });
  });

  // Unit Test for booking a ticket
  describe('POST /book', () => {
    let event;

    beforeEach(async () => {
      // Create an event first
      event = await Event.create({ name: 'Concert', totalTickets: 100, availableTickets: 100 });
    });

    it('should successfully book a ticket if tickets are available', async () => {
      const response = await request(app)
        .post('/book')
        .send({ eventId: event.eventId, userId: 'someUserId' });

      expect(response.status).toBe(200);
      expect(response.body.bookingId).toBeDefined();
      expect(response.body.eventId).toBe(event.eventId);
    });

    it('should add to waiting list if no tickets are available', async () => {
      // Make tickets unavailable
      await event.update({ availableTickets: 0 });

      const response = await request(app)
        .post('/book')
        .send({ eventId: event.eventId, userId: 'someUserId' });

      expect(response.status).toBe(200);
      expect(response.body.waitingList).toBe(true);
    });
  });

  // Unit Test for canceling a booking
  describe('POST /cancel', () => {
    let event, booking;

    beforeEach(async () => {
      // Create an event and a booking first
      event = await Event.create({ name: 'Concert', totalTickets: 100, availableTickets: 100 });
      booking = await Booking.create({ eventId: event.eventId, userId: 'someUserId' });
    });

    it('should cancel a booking and free up a ticket', async () => {
      const response = await request(app)
        .post('/cancel')
        .send({ bookingId: booking.bookingId });

      expect(response.status).toBe(200);
      const updatedEvent = await Event.findByPk(event.eventId);
      expect(updatedEvent.availableTickets).toBe(101);  // Ticket should be available now
    });

    it('should automatically assign a ticket to the next waiting list user if available', async () => {
      // Add user to the waiting list since tickets are sold out
      await event.update({ availableTickets: 0 });
      const user = await WaitingList.create({ eventId: event.eventId, userId: 'waitingUserId' });

      const response = await request(app)
        .post('/cancel')
        .send({ bookingId: booking.bookingId });

      expect(response.status).toBe(200);
      const updatedWaitingList = await WaitingList.findByPk(user.id);
      expect(updatedWaitingList).toBeNull();  // User should be removed from the waiting list
      const updatedEvent = await Event.findByPk(event.eventId);
      expect(updatedEvent.availableTickets).toBe(0);  // No additional tickets should be available since cancellation is complete
    });
  });

});
