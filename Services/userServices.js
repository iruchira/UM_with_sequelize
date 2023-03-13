const db = require('../Models/indexx');
const basicdetails = db.Modelbasicdetails
const logindetails = db.Modellogindetails
const resedentialdetails = db.Modelresdentialdetails
const statedetails = db.Modelstatedetails
const { Op, where } = require('sequelize');


// exports.allServices = async()=>{
//   try{
//     const result = await basicdetails.findAll({
//       attributes:[
//         "user_id",
//         "firstname",
//         "lastname",
//         "gender",
//         "date_of_birth",
//         "contactno",
//       ],
//       where:{user_delete:"0"},
//       include:[
//         {
//           model : logindetails,
//           attributes:[
//             "email",
//             "password",
//           ],
//           required: true,
//         },
//         {
//           model: resedentialdetails,
//           attributes:[
//             "buildingname",
//             "street",
//             "landmark",
//             "pincode"
//           ],
//           required: true,
//         },
//         {
//           model : statedetails,
//           attributes:[
//             "state",
//             "city",
//           ],
//           required: true,
//         },
//       ],
//     });
//     return await result;
//   }catch (err){
//    console.log("error");
//   }
// };


exports.pageinationServices =async(page,limit)=>{     
  let pages = parseInt(page);
  let limits = parseInt (limit);
  let off = (pages-1)* limits;
  try{
    const { count, rows } = await basicdetails.findAndCountAll({
      attributes: [
        "user_id",
        "firstname",
        "lastname",
        "gender",
        "date_of_birth",
        "contactno",
      ],
      where: { user_delete: "0" },
      offset: off,
      limit: limits,
      include: [   
        {
          model: logindetails,
          attributes: [
            "email",
            "password",
          ],
          required: true,
        },
        {
          model: resedentialdetails,
          attributes: [
            "buildingname",
            "street",
            "landmark",
            "pincode",
        ],
          required: true,
        },
        {
          model: statedetails,
          attributes: [
            "state",
            "city",
        ],
          required: true,
        },
      ],
    });
    let totalrecords = await count;
    let pagedata = resultData(rows);
    totalPages=Math.ceil(totalrecords/ 2)
    // console.log(paginationData)
    return {
      pagedata,
      totalrecords,
      totalPages,
      success: true,
    };

  }catch (err){
    return { err, success: false };
  }
};

exports.getOneUser = async (emailChar) => {
  try{ 
    const result = await logindetails.findAll({
    where: {
      [Op.and]: [
        {
          user_delete:{
            [Op.eq]:"0"
          }
        },
        {
          email:{
            [Op.like]:`%${emailChar}%`
          }
        }
      ]
    },include:[
      {
        model: basicdetails,
      },{
        model: resedentialdetails,
      },{
        model: statedetails,
      }],
  });
  console.log(result);
  let pagedata = resultData(result);
  let totalrecords = pagedata.length;
  let totalPages= Math.ceil(totalrecords/ 2);
  return {
    pagedata,
     totalrecords,
     totalPages,
  };
 }catch (err){
  console.log(err);
 }
};


exports.createServices = async (user) => {
  try {
    await db.sequelize.transaction(async (t) => {
      const table1 = await basicdetails.create({
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        date_of_birth: user.date_of_birth,
        contactno: user.contactno,
      }, { transaction: t });

      const table2 = await logindetails.create({
        email: user.email,
        password: user.password,
        user_id: table1.user_id,
      }, { transaction: t });

      const table3 = await resedentialdetails.create({
        buildingname: user.buildingname,
        street: user.street,
        landmark: user.landmark,
        pincode: user.pincode,
        user_id: table1.user_id,
      }, { transaction: t });

      const table4 = await statedetails.create({
        state: user.state,
        city: user.city,
        user_id: table1.user_id,
      }, { transaction: t });
    });
    return true;
  } catch (e) {
    console.log("error...");
  }
};

exports.updateServices = async (id, body) => {
  console.log("update this id:", id);
  try {
    await db.sequelize.transaction(async (t) => {
      const table1 = await basicdetails.update(body, { where: { user_id: id } }, { transaction: t });
      console.log(table1, "hello i m table 1");
      const table2 = await logindetails.update(body, { where: { user_id: id } }, { transaction: t });
      const table3 = await resedentialdetails.update(body, { where: { user_id: id } }, { transaction: t });
      const table4 = await statedetails.update(body, { where: { user_id: id } }, { transaction: t });
    });
    return true;
  } catch (e) {
    console.log("error updating tables..");
  }
};

exports.deleteServices = async (id) => {
  console.log(id);
  try{
    await db.sequelize.transaction(async (t) => {
    const table1 = await basicdetails.update({ user_delete: "1" }, { where: { user_id: `${id}` } },{ transaction: t });
    const table2 = await logindetails.update({user_delete: "1"},{where:{user_id: `${id}`}}, {transaction: t});
    const table3 = await resedentialdetails.update({user_delete:"1"},{where:{user_id: `${id}`}},{transaction: t});
    const table4 = await statedetails.update({user_delete:"1"},{where:{user_id: `${id}`}},{transaction: t});
    });
    return true;
  }
  catch (e){
   console.log("error deleting data");
  }
}

 let resultData = (obj)=>{
  console.log(obj)
  let arr =[];
  for (let i=0;i<obj.length;i++){
    const basicdata = obj[i];
    const logdata = obj[i].logindetail;
    const resdata = obj[i].resedentialdetail;
    const statedata = obj[i].statedetail;
     const newObj= {
       email:logdata.email,
       password:logdata.password,
       firstname: basicdata.firstname,
       lastname:basicdata.lastname,
       gender:basicdata.gender,  
       date_of_birth:basicdata.date_of_birth,
       contactno:basicdata.contactno,
       buildingname:resdata.buildingname,
       street:resdata.street,
       landmark:resdata.landmark,
       pincode:resdata.pincode,
       state:statedata.state,
       city:statedata.city
  }
    arr.push(newObj);
  console.log(arr);
  }
  return arr;
 };