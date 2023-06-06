require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const nodemailer=require("nodemailer")
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const passport = require("passport");
const mySecret = process.env.MY_SECRET;
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = mySecret;
opts.passReqToCallback = true;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(passport.initialize());


mongoose.connect(process.env.MY_DB, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    profileImageUrl: String,
    product: [{
        bookName: String,
        price: String,
        city: String,
        mobileNumber: String,
        productImageUrl: String
    }]
});



const User = new mongoose.model("User", userSchema);


app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
passport.use(new JwtStrategy(opts, function (req, jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id }).then(function (user) {
        if (user) {
            req.user=user;
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
    ).catch((error) => {
        return done(error, false);
    });
}));


app.post("/sendEmailOtp", (req, res) => {
    const otp = Math.floor((Math.random()) * 999999) + 111111;
    console.log("email otp is " + otp);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD
        }
    });
    var mailOptions = {
        from: process.env.MY_EMAIL,
        to: req.body.username.toString(),
        subject: 'Otp',
        text: otp.toString()
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Otp not sent",
                error: error
            });
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).send({
        success: true,
        message: "Otp sent successfully",
        otp: otp.toString()
    });
    // console.log();
});

app.post("/signupBackend", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: hashSync(req.body.password, 10),
        name: req.body.name,
        profileImageUrl: req.body.profileImageUrl
    });
    user.save().then((user) => {
        return res.status(200).send({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
            }
        });
    }).catch((error) => {
        return res.status(400).send({
            success: false,
            message: "User not registered",
            error: error
        });
    });
});

app.get("/productsBackend", (req, res) => {
    User.find({ }).then((result) => {
        return res.status(200).send({
            success: true,
            message: "Products fetched successfully",
            result: result.map((item) => {
                return {
                    product: item.product
                }
            })
        });
    }).catch((error) => {
        return res.status(400).send({
            success: false,
            message: "Products not fetched",
            error: error
        });
    });
});



app.post("/uploadBackend",passport.authenticate('jwt',{session:false}), (req, res) => {
    User.updateOne({ username: req.body.username }, { $push: { product: { bookName: req.body.bookName, price: req.body.price, city: (req.body.city).toLowerCase(), mobileNumber: req.body.mobileNumber, productImageUrl: req.body.productImageUrl } } })
        .then((result) => {
            // console.log("result", result);
            return res.status(200).send({
                success: true,
                message: "Product uploaded successfully"
            });
        }).catch((error) => {
            console.log("error", error);
            return res.status(400).send({
                success: false,
                message: "Product not uploaded"
            });
        });
});

app.get("/signinCheckBackend", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({
        success: true,
        message: "You are logged in",
    });
});
app.get("/accountBackend", passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log("account backend",req.user);
    return res.status(200).send({
        success: true,
        user:{
            profileImageUrl:req.user.profileImageUrl,
            username:req.user.username,
            name:req.user.name,
            product:req.user.product
        }
    });
});
app.post("/signinBackend", (req, res) => {
    User.findOne({ username: req.body.username }).then(function (foundUser) {
        if (!foundUser) {
            res.status(401).send({
                success: false,
                message: "User not found",
            });
        }
        if (!compareSync(req.body.password, foundUser.password)) {
            res.status(401).send({
                success: false,
                message: "Password is incorrect",
            });
        }
        const payload = {
            id: foundUser._id,
            username: foundUser.username,
        };
        const token = "Bearer " + jwt.sign(payload, mySecret, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            username:foundUser.username,
            token: token
        });
    }).catch((err) => {
        console.log(err);
        return res.status(400).send({
            success: false,
            message: "Unexpected error, retry",
            error: err
        });
    });
});


app.listen(process.env.MY_PORT, (req, res) => {
    console.log("Server stated at port 2000");
});