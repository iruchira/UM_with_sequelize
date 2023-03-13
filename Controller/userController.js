const{
    // allServices,
    createServices,
    getOneUser,
    updateServices,
    deleteServices,
    pageinationServices
}= require("../Services/userServices.js");

// exports.viewAllUsers = async(req,res)=>{
//     // const page= req.query.page;
//     // const limit = req.query.limit;
//     const controllerAdd = await allServices();
//     //  console.log(page,limit);
//     console.log(controllerAdd)
//     if(controllerAdd.length>0){
//         res.status(200).send(controllerAdd);
//         console.log("hi i am all data",controllerAdd);
//     }
//     else{
//         res.status(400).send("error in fetching data...");
//     }
// };


exports.paginationUser = async (req,res)=>{
    const controllerAdd =await pageinationServices(req.query.page, req.query.limit);
    console.log(controllerAdd)
    if(controllerAdd.success === true){
        res.status(200).send(controllerAdd);
    }else{
        res.status(400).send("pageination error..");
    }
};

exports.getSingleUser=async(req,res)=>{
    const emailChar = req.params.email;
    console.log(emailChar);
    const resultFromService= await getOneUser(emailChar);
    if((resultFromService.totalrecords >0)){
        res.status(200).send(resultFromService);
    }
    else{
        res.status(400).send("No User Found");
    }
}
exports.addUsers = async(req,res)=>{
    const controllerAdd = await createServices(req.body);
    res.status(200).send(controllerAdd);
    if(!controllerAdd ){
        res.status(400).send("Enter Valid Data");
    }else{
        res.status(200).send(controllerAdd.body);
    }
};
exports.updateUsers= async(req,res)=>{
    const id = req.params.id;
    console.log(id," im controller id");
    const body = req.body;
    const controllerAdd = updateServices(id ,body);
    if (!controllerAdd) {
        return res.status(404).send(`No user found with ID ${id}`);
      } else {
        return res.send(`User with ID ${id} updated successfully`);
      }
}

exports.deleteUsers =async (req,res)=>{
const id = req.params.id;
const controllerAdd = await deleteServices(id);
if(!controllerAdd){
return res.status(404).send(`No user found with id ${id}`)
}else{
   return res.send(`user with id ${id} deleted successfully...`)
}
}