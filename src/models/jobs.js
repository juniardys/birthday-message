'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jobs.init({
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Jobs',
    underscored: true,
    timestamps: true,
  });
  return Jobs;
};