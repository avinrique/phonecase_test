const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const { strict } = require('assert')
const DesignSchema = new mongoose.Schema({
    design_image : String ,

    design_name:{
        type: String
    },
    category:{
        type: String,
        enum : ["Anime" , "Classic", "marble desing" , "Classic Dark" , "customised Photo" ,"customised Design" , "Marval" , "fumky" , "tradditional", "custom Name" ,'sports', 'others']
    }
})
const Design =  mongoose.model('Design', DesignSchema)
module.exports = Design
