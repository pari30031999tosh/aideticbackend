const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) =>{

    const Users = sequelize.define('users', {
  
      
      username: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    }, {
      // Other model options go here
        freezeTableName: true

    });

    return Users;
} 





