'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({user}) {
      this.belongsTo(user);
    }
  }
  resume.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    resumeDetails:{
      type:DataTypes.STRING
    },
    comments:{
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
    modelName: 'resume',
    timestamps: false,
    tableName: 'resume'
  });
  return resume;
};