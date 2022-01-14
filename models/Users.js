const Sequilize = require('sequelize');
const sequelize = require('../config/db')

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: Sequilize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequilize.STRING
      // allowNull defaults to true
    }, 
    username: {
        type: Sequilize.STRING
        // allowNull defaults to true
    },
    email: {
        type: Sequilize.STRING
        // allowNull defaults to true
    }
    ,
    password: {
        type: Sequilize.STRING
        // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });

module.exports = User