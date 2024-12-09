const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Import models
const User = require("./User")(sequelize, DataTypes);
const Event = require("./Events")(sequelize, DataTypes);
const Booking = require("./Booking")(sequelize, DataTypes);
const WaitingList = require("./WaitingList")(sequelize, DataTypes);

// Define the db object with models and sequelize
const db = {
  sequelize,
  User,
  Event,
  Booking,
  WaitingList,
};

// Set up model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
