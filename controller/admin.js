const User = require("./../model/userdatamodel")
const Design = require('./../model/designmodel')

exports.getadmincontrol = async(req,res)=>{
    res.render("admin")
   const admin = await User.create({phone_number : 9811005038 , Name :"avin" ,email:"avigupta2001ad@gmail.com",address :"banglore yalankha"})
   if(admin){
    console.log("data sent successfully")
   }
}



