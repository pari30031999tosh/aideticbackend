const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) =>{

    const Movies = sequelize.define('movies', {
  
      moviename: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,  
      },
      director_name: {
        type: Sequelize.STRING,
      },
      Release_Date: {
        type: Sequelize.DATE,
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

    return Movies;
} 





