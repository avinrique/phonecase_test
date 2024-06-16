const express = require('express')
const router = express.Router()
const phonecontroller =  require("./../controller/phonecontrol")
router.route("/").get(phonecontroller.getphonecontrol)
module.exports = router



