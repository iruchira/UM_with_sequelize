module.exports= (sequelize,DataTypes)=>{
    const statedetails = sequelize.define('statedetails', {
      // Model attributes are defined here
       stateAdd_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey :true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      city: {
          type: DataTypes.STRING,
          allowNull:false
          // allowNull defaults to true
        },user_delete :{
          type: DataTypes.ENUM("0", "1"),
          defaultValue: "0",
          allowNull: false,
        },
      user_id: DataTypes.INTEGER
    },{
      timestamps:true
    });
    
    // console.log(User === sequelize.models.User); // true
    return statedetails;
  }
