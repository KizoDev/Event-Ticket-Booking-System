const { User } = require("../models");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
      }

      const user = await User.create({ name, email });

      return res.status(201).json({ message: "User created successfully.", user });
    } catch (error) {
      return res.status(500).json({ message: "Error creating user.", error: error.message });
    }
  },
};
