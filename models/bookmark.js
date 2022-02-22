'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.hasMany(models.User)
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "UserId is required"},
        notEmpty: {msg: "UserId is required"},
      }
    },
    NewsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "NewsId is required"},
        notEmpty: {msg: "NewsId is required"},
      }
    },
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};