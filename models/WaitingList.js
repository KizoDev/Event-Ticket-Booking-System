module.exports = (sequelize, DataTypes) => {
    const WaitingList = sequelize.define('WaitingList', {
      waitingListId: {
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
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    WaitingList.associate = (models) => {
      WaitingList.belongsTo(models.Event, { foreignKey: 'eventId' });
      WaitingList.belongsTo(models.User, { foreignKey: 'userId' });
    };
  
    return WaitingList;
  };
  