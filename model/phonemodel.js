const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const Phone_Model = new mongoose.Schema({
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
    type_of_case :
    {
        type: String,
        enum : ["softcase" , "hardcase" , " glasscase"]
    },
    chainforcase:
    {
        type:Boolean ,
        default: false
    }   
}) 
const PhoneModel =  mongoose.model('PhoneModel', Phone_Model)
module.exports = PhoneModel