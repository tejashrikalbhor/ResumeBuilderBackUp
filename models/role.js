'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user}) {
      this.belongsTo(user);
    }
  }
  role.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    roleName: {
      type:DataTypes.STRING
    },
    userId: {
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
    modelName: 'role',
    timestamps: false,
    tableName:'role'
  });
  return role;
};