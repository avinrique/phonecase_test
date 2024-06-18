const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const cartSchema = new mongoose.Schema({
    image_url:{
        type:String
    },
    case_material :{
        type: String,
        enum : ["softcase" , "hardcase" , " glasscase" , "metalcase"]
    },
    phone_brand :
    {
        type : String
    },
    phone_model : 
    {
        type: String
    },
    image_name : 
    {
        type : String 
    },


    // image_url ,
    // case_material,
    // phone_brand,
    // phone_model,
    // image_name ,

})
    
const carts =  mongoose.model('Carts', cartSchema)
module.exports = carts