const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const UserSchema = new mongoose.Schema({
    phone_number:{
        type : Number,
        minlength : 10,
        maxlength : 10
    },
    Name :{
        type : String
    },
    email:{
        type : String ,
        minlength : 4 , 
        maxlength : 45 ,
        trim : true , 
        default : "N  /  A"
    },
    address:{
        type: String        
    },
    pincode:{
        type: Number
    },
    geolatitude:{
        type: String
    },
    geolongtitude :{
        type: String
    }

})
const User =  mongoose.model('User', UserSchema)
module.exports = User