const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
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
    version : 
    {
        type : String ,
        enum:["iphone" ,"android"]
    },
    

})