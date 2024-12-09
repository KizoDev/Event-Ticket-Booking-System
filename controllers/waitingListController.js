const { WaitingList } = require("../models");

module.exports = {
  getWaitingList: async (req, res) => {
    try {
      const { eventId } = req.params;

      const waitingList = await WaitingList.findAll({ where: { eventId } });

      if (!waitingList.length) {
        return res.status(404).json({ message: "No users in the waiting list for this event." });
      }

      return res.status(200).json({ waitingList });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving waiting list.", error: error.message });
    }
  },
};
