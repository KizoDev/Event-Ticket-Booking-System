module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      eventId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalTickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableTickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    Event.associate = (models) => {
      Event.hasMany(models.Booking, { foreignKey: 'eventId' });
      Event.hasMany(models.WaitingList, { foreignKey: 'eventId', as: 'WaitingLists' });
    };
  
    return Event;
  };
  