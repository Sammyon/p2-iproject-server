'use strict';
const {encrypt} = require('../helpers/bcrypt')
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
      User.hasMany(models.Bookmark)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email must be unique"},
      validate: {
        notNull: {msg: "Email is required"},
        notEmpty: {msg: "Email is required"},
        isEmail: {msg: "Invalid email format"}
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Username is required"},
        notEmpty: {msg: "Username is required"},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Password is required"},
        notEmpty: {msg: "Password is required"},
      }
    },
  }, {
    hooks: {
      beforeCreate: (data) => {
        data.password = encrypt(data.password)
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};