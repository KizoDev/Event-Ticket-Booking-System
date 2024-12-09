const { Booking, Event, WaitingList, User} = require("../models");
const sequelize = require("../config/db");

module.exports = {
  bookTicket: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { userId, eventId } = req.body;

        if (!userId || !eventId) {
            return res.status(400).json({ message: "User ID and Event ID are required." });
        }

         // Check if the user exists
         const user = await User.findByPk(userId);
         if (!user) {
             return res.status(404).json({ message: "User not found." });
         }

        const event = await Event.findByPk(eventId, { transaction });

        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        if (event.availableTickets > 0) {
            const booking = await Booking.create({ userId, eventId }, { transaction });
            event.availableTickets -= 1;
            await event.save({ transaction });
            await transaction.commit();

            return res.status(201).json({ message: "Ticket booked successfully.", booking });
        } else {
            // Calculate the position in the waiting list
            const waitingListCount = await WaitingList.count({ where: { eventId }, transaction });
            const position = waitingListCount + 1; // Position is one more than current count

            const waitingUser = await WaitingList.create(
                { userId, eventId, position },
                { transaction }
            );
            await transaction.commit();

            return res.status(200).json({ message: "Added to waiting list.", waitingUser });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: "Error booking ticket.", error: error.message });
    }
},


  cancelBooking: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { bookingId } = req.body;

      const booking = await Booking.findByPk(bookingId, { transaction });
      console.log(booking);
      
      if (!booking) {
        return res.status(404).json({ message: "Booking not found." });
      }

      const event = await Event.findByPk(booking.eventId, { transaction });

      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }

      await booking.destroy({ transaction });

      const nextUser = await WaitingList.findOne({ where: { eventId: event.eventId }, order: [["createdAt", "ASC"]], transaction });

      if (nextUser) {
        await Booking.create({ userId: nextUser.userId, eventId: event.eventId }, { transaction });
        await nextUser.destroy({ transaction });
      } else {
        event.availableTickets += 1;
      }

      await event.save({ transaction });
      await transaction.commit();

      return res.status(200).json({ message: "Booking cancelled successfully." });
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ message: "Error cancelling booking.", error: error.message });
    }
  },
};
