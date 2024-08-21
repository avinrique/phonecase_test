const Design = require('./../model/designmodel')
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
    res.render("order")
}
exports.getadminlogincontrol = async(req,res)=>{
    res.render("adminlogin")
}



