const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const passportlocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')
const { type } = require('os')
const orderItemSchema = new mongoose.Schema({
    imagename: { type: String, required: true },
    case_material: { type: String, enum: ['softcase', 'hardcase', 'glasscase'], required: true },
    phone_brand: { type: String, required: true },
    phone_model: { type: String, required: true },
    custom_image: { type: String, required: true },
    // quantity :{ type:Number , required:true},
    // price: { type: Number, required: true }
});
const order_ss =  mongoose.model('Orderitem', orderItemSchema)
module.exports = order_ss
const orderSchema = new mongoose.Schema({
    orderItems: [orderItemSchema],
    custnames :{type:String},
    first_name: {type : String },
    address : {type : String },
    city : {type : String },
    state :{type : String },
    postcode : {type : String },
    email : {type : String },
    phone : {type : Number},
    geolocation :{type: String},
    paymentScreenshot  :{type:String
    }
})
const order_s =  mongoose.model('Order', orderSchema)
module.exports = order_s
