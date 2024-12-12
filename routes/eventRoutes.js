const express = require("express");
const router = express.Router();
const EventController = require("../controllers/eventController");
/**
 * @swagger
 * /initialize:
 *   post:
 *     summary: Create a new event
 *     description: This endpoint allows you to create a new event with a specified name and total number of tickets.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - totalTickets
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the event.
 *                 example: "Music Concert"
 *               totalTickets:
 *                 type: integer
 *                 description: The total number of tickets available for the event.
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created successfully."
 *                 event:
 *                   type: object
 *                   properties:
 *                     eventId:
 *                       type: integer
 *                       description: The unique identifier of the created event.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: The name of the event.
 *                       example: "Music Concert"
 *                     totalTickets:
 *                       type: integer
 *                       description: The total number of tickets for the event.
 *                       example: 1000
 *                     availableTickets:
 *                       type: integer
 *                       description: The number of tickets still available.
 *                       example: 1000
 *       400:
 *         description: Bad request, missing required fields (name, totalTickets)
 *       500:
 *         description: Internal server error
 */
router.post("/initialize", EventController.createEvent);

/**
 * @swagger
 * /status/{eventId}:
 *   get:
 *     summary: Get the status of an event
 *     description: This endpoint retrieves the status of an event, including the number of available tickets and the number of people on the waiting list.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: The ID of the event to get the status for.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: Event status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: string
 *                   description: The unique identifier of the event.
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 name:
 *                   type: string
 *                   description: The name of the event.
 *                   example: "Music Concert"
 *                 availableTickets:
 *                   type: integer
 *                   description: The number of available tickets for the event.
 *                   example: 500
 *                 waitingList:
 *                   type: integer
 *                   description: The number of people on the waiting list for the event.
 *                   example: 20
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.get("/status/:eventId", EventController.getEventStatus);

module.exports = router;
