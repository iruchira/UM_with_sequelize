
module.exports= (sequelize,DataTypes)=>{
    const resedentialdetails = sequelize.define('resedentialdetails', {
      // Model attributes are defined here
        add_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey :true
      },
      buildingname: {
        type: DataTypes.STRING,
        allowNull: false,
        // allowNull defaults to true
      },
      street: {
          type: DataTypes.STRING,
          allowNull:false
          // allowNull defaults to true
        },
        landmark: {
            type: DataTypes.STRING,
            allowNull:false
            // allowNull defaults to true
          },
        pincode: {
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
    return resedentialdetails;
  }
  