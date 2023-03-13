
// const dataBaseConfig = ('../Config/database.js');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('user_management','postgres',8999155328,{
    host: 'localhost',
    dialect: 'postgres',
    logging:false
  });
  //test database sequelize//
  try{
    sequelize.authenticate()
    console.log("database connected..");
  } catch(err){
    console.log("error connecting database");
  }; 
  
db={};
db.Sequelize =Sequelize;
db.sequelize = sequelize;  

db.Modelbasicdetails= require('./basicdetails')(sequelize,DataTypes);
db.Modellogindetails= require ('./logindetails')(sequelize,DataTypes);
db.Modelresdentialdetails =require ('./resedentialdetails')(sequelize,DataTypes);
db.Modelstatedetails = require('./statedetails')(sequelize,DataTypes);

db.Modelbasicdetails.hasOne(db.Modellogindetails,{
  foreignKey: 'user_id'
});

db.Modellogindetails.belongsTo(db.Modelbasicdetails,{
  foreignKey: 'user_id'
});

db.Modellogindetails.belongsTo(db.Modelresdentialdetails,{
  foreignKey: 'user_id'
});

db.Modellogindetails.belongsTo(db.Modelstatedetails,{
  foreignKey: 'user_id'
});
db.Modelbasicdetails.hasOne(db.Modelresdentialdetails,{
  foreignKey: 'user_id'
});
db.Modelbasicdetails.hasOne(db.Modelstatedetails,{
  foreignKey: 'user_id'
});

db.sequelize.sync({force:false})
.then(()=>{
console.log("models sync with database....");
})
.catch((err)=>{
    console.log("failed to connect database...");
});
module.exports =db;
