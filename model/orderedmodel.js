const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const { type } = require('os')
const orderItemSchema = new mongoose.Schema({
    imagename: { type: String, required: true },
    case_material: { type: String, enum: ['softcase', 'hardcase', 'glasscase', 'metalcase'], required: true },
    phonebrand: { type: String, required: true },
    phonemodel: { type: String, required: true },
    imageurl: { type: String, required: true },
    // quantity :{ type:Number , required:true},
    // price: { type: Number, required: true }
});
const orderSchema = new mongoose.Schema({
    orderItems: [orderItemSchema],

    custnames :{type:String},
    email : {type : String },
    phone : {type : Number},


    
    address : {type : String },
    city : {type : String },
    state :{type : String },
    postcode : {type : String },

    geolocation :{type: String},
    paymentScreenshot  :{type:String
    }
})
const order_s =  mongoose.model('Order', orderSchema)
module.exports = order_s
