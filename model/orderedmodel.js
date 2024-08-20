const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const orderSchema = new mongoose.Schema({
    



    custom_image :{
        type:String
    },
    custname :{type:String

    },
    case_material :{
        type: String,
        enum : ["softcase" , "hardcase" , "glasscase"]
    },
    phone_brand :
    {
        type : String
    },
    phone_model : 
    {
        type: String
    },
    first_name: 
    {
        type : String 
    },
    address : 
    {
        type : String 
    },
    city : 
    {
        type : String 
    },
    state : 
    {
        type : String 
    },
    postcode : 
    {
        type : String 
    },
    email : 
    {
        type : String 
    },
    phone : 
    {
        type : Number
    },
    geolocation :{
        type: String
    }
})
const order_s =  mongoose.model('Order', orderSchema)
module.exports = order_s
