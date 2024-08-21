const User = require("./../model/userdatamodel")
const Design = require('./../model/designmodel')
const Orderss = require('./../model/orderedmodel')

exports.getadmincontrol = async (req, res) => {
    if (req.cookies.adminAuth) {
        try {
            const orders = await Orderss.find({}); // Fetch all orders from the database
            res.render("admin", { orders }); // Pass the orders to the EJS template
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.redirect('/');
    }
};






