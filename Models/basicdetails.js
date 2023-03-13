
module.exports= (sequelize,DataTypes)=>{
  const basicdetails = sequelize.define('basicdetails', {
    // Model attributes are defined here
      user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey :true
    },
      firstname: {
      type: DataTypes.STRING,
      allowNull:false
      // allowNull defaults to true
    },
      lastname: {
        type: DataTypes.STRING,
        allowNull:false
        // allowNull defaults to true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull:false
        // allowNull defaults to true
      },
      date_of_birth: {
        type: DataTypes.STRING,
        allowNull:false
        // allowNull defaults to true
      },
      contactno:{
        type :DataTypes.STRING,
        allowNull:false
      },
      user_delete :{
        type: DataTypes.ENUM("0", "1"),
        defaultValue: "0",
        allowNull: false,
      }
  }, {
    timestamps:true
  });
  
  // console.log(User === sequelize.models.User); // true
  return basicdetails;
}
