'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({userDetails,position,role,resume}) {
      this.hasOne(userDetails);
      this.hasOne(position,{foreignKey:'createdBy',as:'positionId'});
      this.hasOne(role);
      this.hasMany(resume);
      
    }
  }
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    email:{
      allowNull: false,
      type:DataTypes.STRING
    },
    password:{
      allowNull: false,
      type:DataTypes.STRING
    },
    roleId: {
      allowNull: false,
      type:DataTypes.INTEGER,
      references: { model: 'role', key: 'id' }
    },
    position:{
      allowNull: false,
      type:DataTypes.STRING
    },
    createdOn: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedOn: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName:'user',
    timestamps: false
  });
  return user;
};