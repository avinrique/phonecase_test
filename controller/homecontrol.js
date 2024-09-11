const Design = require('./../model/designmodel')
const fs = require("fs")
const path = require("path")
exports.gethomecontrol = (req,res)=>{
    Design.find({}, (err, designs) => {
        if (err) {
            console.error(err);
        } else {
 /*         
            designs.forEach(design => {
                console.log(`Image Name: ${design.design_image}`);
                console.log(`Design Name: ${design.design_name}`);
                console.log(`Category: ${design.category}`);
            });
            */
           res.render('Home' , {des : designs})
        }
    });

}
exports.getcontactcontrol = (req,res)=>{
    res.render("Contact")
}
exports.getcustomordercontrol = (req,res)=>{
    fs.readFile(path.join(__dirname, 'outs.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log("asddasdasdas")
        const phoneData = JSON.parse(data); // Parse the JSON string
        res.render("order", { ps: phoneData.products}); 
        console.log(phoneData) // Now you can access the products array
    });
   
}
exports.getadminlogincontrol = async(req,res)=>{
    res.render("adminlogin")
}



