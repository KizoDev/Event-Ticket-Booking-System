module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      bookingId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      eventId: {
        type: DataTypes.UUID,
        references: { model: 'Events', key: 'eventId' },
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        references: { model: 'Users', key: 'userId' },
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Booking.associate = (models) => {
      Booking.belongsTo(models.Event, { foreignKey: 'eventId' });
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return Booking;
  };
  