const { WaitingList, Event } = require("../models");

module.exports = {
  createEvent: async (req, res) => {
    try {
      const { name, totalTickets } = req.body;

      if (!name || !totalTickets) {
        return res.status(400).json({ message: "Event name and total tickets are required." });
      }

      const event = await Event.create({ name, totalTickets, availableTickets: totalTickets });

      return res.status(201).json({ message: "Event created successfully.", event });
    } catch (error) {
      return res.status(500).json({ message: "Error creating event.", error: error.message });
    }
  },

  getEventStatus: async (req, res) => {
    try {
      const { eventId } = req.params;

      const event = await Event.findByPk(eventId, {
        include: [{ model: WaitingList, as: "WaitingLists" }],
      });

      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }

      return res.status(200).json({
        eventId: event.eventId,
        name: event.name,
        availableTickets: event.availableTickets,
        waitingList: event.WaitingLists.length,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving event status.", error: error.message });
    }
  },
};
