const Design = require('./../model/designmodel')
const fs = require('fs')
const path = require('path')
exports.getphonecontrol = (req,res)=>{
    Design.find({}, (err, designs) => {
        if (err) {
            console.error(err);
        } else {
            fs.readFile(path.join(__dirname, 'outs.json'), 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                console.log("asddasdasdas")
                const phoneData = JSON.parse(data); // Parse the JSON string
                res.render("iphones", { ps: phoneData.products , des : designs}); 
                console.log(phoneData) // Now you can access the products array
            });
 /*         
            designs.forEach(design => {
                console.log(`Image Name: ${design.design_image}`);
                console.log(`Design Name: ${design.design_name}`);
                console.log(`Category: ${design.category}`);
            });
            */
 
        }
    });
}