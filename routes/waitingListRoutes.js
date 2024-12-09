const express = require("express");
const router = express.Router();
const WaitingListController = require("../controllers/waitingListController");

/**
 * @swagger
 * /waitinglist/{eventId}:
 *   get:
 *     summary: Get the waiting list for an event
 *     description: This endpoint retrieves the waiting list for a specific event.
 *     tags:
 *       - WaitingList
 *     parameters:
 *       - name: eventId
 *         in: path
 *         required: true
 *         description: The ID of the event for which to retrieve the waiting list.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved the waiting list for the event
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   waitingListId:
 *                     type: integer
 *                     description: The unique identifier of the waiting list entry.
 *                     example: 1
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user on the waiting list.
 *                     example: 1
 *                   eventId:
 *                     type: integer
 *                     description: The ID of the event for which the user is waiting.
 *                     example: 1
 *                   position:
 *                     type: integer
 *                     description: The position of the user in the waiting list.
 *                     example: 1
 *       404:
 *         description: Event not found or no users on the waiting list
 *       500:
 *         description: Internal server error
 */
router.get("/:eventId", WaitingListController.getWaitingList);

module.exports = router;
