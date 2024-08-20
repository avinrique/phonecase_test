//modules
const order_s = require("./model/orderedmodel")
const carts = require("./model/cartmodel")

require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const uuid =  require('uuid')
const axios = require('axios');
const Design = require('./model/designmodel')
//const User = require('./models/usermodel')
var validator = require('validator');
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});

//middlewares
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')

// setting view engine to ejs
app.set('view engine', 'ejs')

//database configure ("monodb/mongoose")
const mongoose = require('mongoose')
const dbname = "phonecases"
const dburl = "mongodb+srv://avin:avin@cluster0.fhxczjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



mongoose.connect(dburl+dbname,
{useNewUrlParser: true},
{useCreateIndex :true},
{strictQuery : true}
).then(()=>{
    console.log("connected to database")
})

//multer
var fs = require('fs');
var path = require('path');
const multer = require('multer')



const orderstorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/customorder'); // 'public' is the root directory, 'pic' is the subdirectory
  },
  filename: (req, file, cb) => {
      const uniqueFileName = `${uuid.v4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFileName);
  }
});
const customOrderUpload = multer({ storage:orderstorage  });
 module.exports = customOrderUpload



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/pic'); // 'public' is the root directory, 'pic' is the subdirectory
  },
  filename: (req, file, cb) => {
      const uniqueFileName = `${uuid.v4()}${path.extname(file.originalname)}`;
      cb(null, uniqueFileName);
  }
});


const upload = multer({ storage: storage });
 module.exports = upload



//using middlewares
//app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(xss())
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


//using limiter to limit usages
const limiter = rateLimit({
  max : 100 ,
  windows : 60*60*1000,
  message : "crossed the limit"
})
app.use('/',limiter)
//Routes handler
const home = require('./routes/home')
const cart = require('./routes/cart')
const phones = require('./routes/phones')
const admin = require('./routes/admin')
/*
const authenticateing = require('./routes/authenticate')
const profile = require('./routes/profile')
const userauth = require('./routes/userauth')
*/
//using routes middleware
app.use('/',home )
app.use('/phonecases',phones)
app.use('/cart',cart)
app.use('/admin' , admin)
/*
app.use('/authenticate',authenticateing)
app.use('/profile',profile)
app.use('/user' , userauth)
*/
//


app.post('/upload', upload.single('design_image'), (req, res) => {
  if (req.file) {
      const design_name = req.body.design_name;
      const category = req.body.category;
      const design_image = req.file.filename;

      if (!design_name) {
          return res.status(400).send('Design name is required.');
      }

      const newDesign = new Design({
          design_name,
          category,
          design_image,
      });
      
      newDesign.save()
          .then(() => {
              res.send('Design uploaded and saved to the database.');
          })
          .catch(err => {
              res.status(500).send(err);
          });
  } else {
      res.send('No image selected.');
  }
});

app.post('/orderupload', customOrderUpload.single('custom_image'), (req, res) => {
  if (req.file) {
      const first_name = req.body.fname;
      const phone= req.body.phone;
      const custom_image = req.file.filename;
      const email = req.body.email;
      const case_material = req.body.case_material;
      const phone_brand = req.body.phone_brand;
      const phone_model = req.body.phone_model
      const state = req.body.state;
      const city = req.body.city;
      const postcode = req.body.postcode;
      const address = req.body.address
      const geolocation =  req.body.geolocation
      const custname = req.body.custname
      console.log(first_name,phone,custom_image,email,case_material,phone_brand,phone_model,state,city,postcode,address,geolocation , custname)
      const newOrder = new order_s({
          custom_image ,
          case_material,
          phone_brand,
          phone_model,
          first_name,
          address,
          city,
          state,
          postcode,
          email,
          phone,
          geolocation,
          custname
      });
      newOrder.save()
          .then(() => {
              res.send('Design uploaded and saved to the database.');
          })
          .catch(err => {
              res.status(500).send(err);
          });
  } else {
      res.send('No image selected.');
  }
});
app.post("/addtocart", (req,res)=>{
    phone_model= req.body.phonemodel
    phone_brand= req.body.phonebrand
    case_material= req.body.case_material
    image_url= req.body.imageurl
    image_name= req.body.imagename
    image_catagory =  req.body.catagory
    console.log(image_name,image_url,phone_brand,phone_model)
    const newCart = new carts({
        image_url ,
        case_material,
        phone_brand,
        phone_model,
        image_name ,
        
    });
   newCart.save().then(() => {

    
    res.redirect("/cart")
      })
     .catch(err => {
         res.status(500).send(err);
      });
})
app.all('*', (req,res,next)=>{
    res.render('pagenotfound')
    next();

})



module.exports =  app



