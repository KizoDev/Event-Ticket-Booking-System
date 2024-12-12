const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Book a ticket for an event
 *     description: This endpoint allows a user to book a ticket for an event if available. If no tickets are available, the user will be added to the waiting list.
 *     tags:
 *       - Booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - eventId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user booking the ticket.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               eventId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the event for which the ticket is being booked.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Ticket booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket booked successfully."
 *                 booking:
 *                   type: object
 *                   properties:
 *                     bookingId:
 *                       type: integer
 *                       description: The unique identifier of the booking.
 *                       example: 1
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       description: The ID of the user who made the booking.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     eventId:
 *                       type: string
 *                       format: uuid
 *                       description: The ID of the event for which the booking was made.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *       200:
 *         description: Added to waiting list if no tickets available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Added to waiting list."
 *                 waitingUser:
 *                   type: object
 *                   properties:
 *                     waitingListId:
 *                       type: integer
 *                       description: The ID of the waiting list entry.
 *                       example: 1
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       description: The ID of the user on the waiting list.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     eventId:
 *                       type: string
 *                       format: uuid
 *                       description: The ID of the event the user is waiting for.
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     position:
 *                       type: integer
 *                       description: The position of the user in the waiting list.
 *                       example: 1
 *       400:
 *         description: Bad request, missing required fields (userId, eventId)
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.post("/book", BookingController.bookTicket);

/**
 * @swagger
 * /cancel:
 *   post:
 *     summary: Cancel a booking
 *     description: This endpoint allows a user to cancel a previously made booking. If there is a waiting list, the next user will be booked.
 *     tags:
 *       - Booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookingId
 *             properties:
 *               bookingId:
 *                 type: integer
 *                 description: The ID of the booking to be cancelled.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Booking cancelled successfully, and the next user is booked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Booking cancelled successfully."
 *       404:
 *         description: Booking not found or event not found
 *       500:
 *         description: Internal server error
 */
router.post("/cancel", BookingController.cancelBooking);

module.exports = router;
