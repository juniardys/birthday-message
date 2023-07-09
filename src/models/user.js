'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Location, {
        as: 'location',
        foreignKey: 'locationId',
      })
    }
  }
  User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    timestamps: true,
  });
  return User;
};