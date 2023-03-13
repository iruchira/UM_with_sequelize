
module.exports= (sequelize,DataTypes)=>{
    const logindetails = sequelize.define('logindetails', {
      // Model attributes are defined here
        log_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey :true
      },
        email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        // allowNull defaults to true
      },
        password: {
          type: DataTypes.STRING(255),
          allowNull:false
          // allowNull defaults to true
        },
        user_delete :{
          type: DataTypes.ENUM("0", "1"),
          defaultValue: "0",
          allowNull: false,
        },
      user_id: DataTypes.INTEGER
    },{
      timestamps:true
    });
    
    // console.log(User === sequelize.models.User); // true
    return logindetails;
  }
  