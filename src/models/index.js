const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('movies', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    logging: true
})

sequelize.authenticate()
.then(()=>{
    console.log("database is connected=======================")
})
.catch(err=>{
    console.log("error conecting to database,", err)
})

const models = {

}

models.sequelize = sequelize;
models.Sequelize = Sequelize;


models.sequelize.sync({ alter: true })
.then(()=> console.log("database synced"))
.catch(err => console.log("error synscing to db", err))

models.Users  = require('./users')(sequelize, DataTypes);
models.Movies  = require('./movies')(sequelize, DataTypes);
models.Reviews = require('./review')(sequelize, DataTypes);



module.exports = models;



