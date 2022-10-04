'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      this.belongsTo(user);
    }
  }
  userDetails.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type:DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type:DataTypes.STRING
    },
    contact: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      references: { model: 'user', key: 'id' }
    },
    createdOn: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedOn: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'userDetails',
    timestamps: false,
    tableName:'userDetails'
  });
  return userDetails;
};