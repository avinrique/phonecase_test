const express = require('express')
const router = express.Router()
const homecontroller =  require("./../controller/homecontrol")
router.route("/").get(homecontroller.gethomecontrol)
router.route("/customcover").get(homecontroller.getcustomordercontrol)
router.route("/contact").get(homecontroller.getcontactcontrol)
router.route("/adminlogin").get(homecontroller.getadminlogincontrol)
module.exports = router