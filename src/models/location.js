'use strict';

const moment = require('moment/moment');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Location.hasMany(models.User, {
        as: 'user',
        foreignKey: 'locationId',
      })
    }
  }
  Location.init({
    countryCode: DataTypes.STRING,
    countryName: DataTypes.STRING,
    zoneName: DataTypes.STRING,
    gmtOffset: DataTypes.BIGINT,
    gmtOffsetLabel: {
      type: DataTypes.VIRTUAL,
      get() {
        const dt = moment.duration(this.gmtOffset * 1000);
        let hour = dt.get('hours');
        let minutes = dt.get('minutes').toString().padStart(2, '0');

        if (hour < 0) {
          hour = '-' + (hour*-1).toString().padStart(2, '0');
        } else {
          hour = '+' + hour.toString().padStart(2, '0');
        }

        return `GMT${hour}:${minutes}`;
      },
      set() {}
    }
  }, {
    sequelize,
    modelName: 'Location',
    underscored: true,
    timestamps: true,
  });
  return Location;
};