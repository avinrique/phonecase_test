const express = require('express')
const router = express.Router()
const cartcontroller =  require("./../controller/cartcontrol")
router.route("/").get(cartcontroller.getcartcontrol)
router.route("/pay").get(cartcontroller.getpaycontrol)
module.exports = router