const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const cartSchema = new mongoose.Schema({
    design:{
        type:String
    },
    case :{
        type: String,
        enum : ["softcase" , "hardcase" , " glasscase"]
    },
    brand :
    {
        type : String
    },
    Model : 
    {
        type: String
    },
    design_name : 
    {
        type : String 
    },

})
    
const carts =  mongoose.model('Carts', cartSchema)
module.exports = carts