const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

process.on('uncaughtException', (err) => {
    console.log(err);
  });  

// Database Connection
mongoose.connect("mongodb+srv://minorprojectecom:1234@cluster0.nntmq.mongodb.net/e-commerce");

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running!");
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating Products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type:Boolean,
        default: true,
        required: true
    }
})

app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let productId;
    if(products.length > 0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0],
        productId = lastProduct.id + 1;
    } else {
        productId = 1;
    }
    const product = new Product({
        id: productId,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    })
    
})

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for Getting all Products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({})
    console.log("All Products Fetched!");
    res.send(products);
})

// Creating API for New Collection Data
app.get("/newcollections", async (req, res) => {
    let products = await Product.find({});
    let newCollections = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newCollections);
})

// Creating API for Popular in Women
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({category:"women"});
    let popularInWomen = products.slice(0, 4);
    console.log("Popular In Women Fetched");
    res.send(popularInWomen);    
})

// Creating Midleware for Fetching Users
const fetchUsers = async (req, res, next) => {
    const token = req.header("auth-token");
    if(!token) {
        res.status(401).send({error: "Please autheticate using valid token"});
    } else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        } catch (err) {
            res.status(401).send({error: "Please authenticate using a valid token"})
        }
    }
}

//  Creating API for Cart Products
app.post("/addtocart", fetchUsers, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send("Added");
})

// Creating API for removing Cart Data
app.post("/removefromcart", fetchUsers, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findByIdAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
        res.send("Removed");
    }
})

// Creating API for get Cart Data
app.post("/getcart", fetchUsers,  (req, res) => {
    let userData = Users.findOne({_id: req.user.id});
    res.json(userData.cartData)
})

// Schema for Users
const Users = mongoose.model("users", {
    name: String,
    email: {
        type: String,
        unque: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: Object,
    date: {
        type: Date,
        default: Date.now
    }
})

// Creating endpoint for registering the user
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if(check) {
        return res.status(400).json({
            success: false,
            error: "Already Registerd with given Email ID"
        })
    }
    let cart = {};
    for(let i=0;i<300;i++) {
        cart[i] = 0
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, "secret_ecom");
    res.json({
        success: true, token
    })
})

// Creating Endpoint for User Login
app.post("/login", async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({
                success: true, token
            })
        } else {
            res.json({
                success: false, error: "Wrong Password"
            })
        }
    } else {
        res.json({
            success: false, error: "Wrong Email ID"
        })
    }
})


app.listen(port, (err) => {
    if(!err) {
        console.log("Server is Running on Port " + port)
    }else {
        console.log("Error : " + err)    
    }
});