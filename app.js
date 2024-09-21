//modules
const order_s = require("./model/orderedmodel")
const carts = require("./model/cartmodel")
const crypto = require('crypto');
require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
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

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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

//order
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


 const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        // Generate a unique filename based on current timestamp and a random string
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});
const ssUpload = multer({ storage: fileStorage });
 
module.exports = ssUpload

const storages = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'custom_image') {
        cb(null, 'public/customorder'); // Destination for custom_image
      } else if (file.fieldname === 'payment_screenshot') {
        cb(null, 'public/uploads'); // Destination for payment_screenshot
      } else {
        cb(new Error('Unknown field'), false);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  const uploades = multer({ storage: storages });

// Export the upload instance (if needed)
module.exports = uploades;






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


app.post('/adminlogin', (req, res) => {
  const { username, password } = req.body;

  // Replace with your own user validation logic
  if (username === 'admin' && password === 'password123') {
      // Set a cookie
      res.cookie('adminAuth', 'true', { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
      res.redirect('/admin');
  } else {
      res.send('Invalid credentials. Please try again.');
  }
});

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

app.post('/cart/submit-payment', ssUpload.single('paymentScreenshot'), (req, res) => {
    //image description
    const orderItems = JSON.parse(req.body.orderItems);
    //location
    const city =  req.body.city
    const state = req.body.state
    const postcode = req.body.postcode
    const address = req.body.address;
    const geolocation = req.body.location;
    //name and others
    const first_name= req.body.uname
    const phone = req.body.phonenumber
    const email = req.body.email
    const custnames = req.body.custname
    // payment
    const paymentScreenshot = req.file.filename;

    //logging data

    const newsOrder = new order_s({
        orderItems,

        first_name,
        email,
        phone,

        address,
        city,
        state,
        postcode,

        geolocation,
        custnames,

        paymentScreenshot
    });
    newsOrder.save()
        .then(() => {
            res.redirect("/cart");
        })
        .catch(err => {
            res.status(500).send(err);
        });



});

app.post('/orderupload', uploades.fields([
    { name: 'custom_image', maxCount: 1 },
    { name: 'payment_screenshot', maxCount: 1 }
  ]), (req, res) => {
    if (req.files) {
      const custom_image = req.files['custom_image'] ? req.files['custom_image'][0].filename : null;
      const paymentScreenshot = req.files['payment_screenshot'] ? req.files['payment_screenshot'][0].filename : null;
  
      const { fname: first_name, phone, email, case_material, phone_brand, phone_model, state, city, postcode, address, geolocation, custname } = req.body;
  
     
      const newOrder = new order_s({
        orderItems: {
          imagename: custom_image,  
          case_material,
          phonebrand: phone_brand,
          phonemodel: phone_model,
          imageurl: `${custom_image}`, 
          quantity : req.body.quantity,
          price : req.body.price

        },
        first_name,
        address,
        city,
        state,
        postcode,
        email,
        phone,
        geolocation,
        custname,
        paymentScreenshot
      });
  
      newOrder.save()
        .then(() => {
          res.redirect("/cart")
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      res.send('No images selected.');
    }
  });

app.post("/addtocart", (req,res)=>{
    phone_model= req.body.phonemodel
    phone_brand= req.body.phonebrand
    case_material= req.body.case_material
    image_url= req.body.imageurl
    image_name= req.body.imagename
    image_catagory =  req.body.catagory
    
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



