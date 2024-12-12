module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  
    User.associate = (models) => {
      User.hasMany(models.Booking, { foreignKey: 'userId' });
      User.hasMany(models.WaitingList, { foreignKey: 'userId' });
    };
  
    return User;
  };
  