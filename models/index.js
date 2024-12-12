const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User")(sequelize, DataTypes);
const Event = require("./Events")(sequelize, DataTypes);
const Booking = require("./Booking")(sequelize, DataTypes);
const WaitingList = require("./WaitingList")(sequelize, DataTypes);

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
