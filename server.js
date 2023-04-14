require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const { json } = require("body-parser");
const passport = require("passport");
// var nodemailer = require('nodemailer');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// const twilioNumber = process.env.TWILIO_MOBILE_NUMBER;
const mySecret = process.env.MY_SECRET;
// const { hashSync, compareSync } = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = mySecret;
// opts.passReqToCallback = true;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(passport.initialize());


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
// const adminSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// const organisationSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     name: String,
//     verificationCode: String
// });


const User = new mongoose.model("User", userSchema);

app.post("/signupBackend", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        profileImageUrl: req.body.profileImageUrl
    });
    user.save().then((result) => {
        return res.status(200).send({
            success: true,
            message: "User registered successfully",
            result: result
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
    const city = "g";
    User.find({ "product.city": city.toLowerCase() }).then((result) => {
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




app.post("/uploadBackend", (req, res) => {
    User.updateOne({ username: req.body.username }, { $push: { product: { bookName: req.body.bookName, price: req.body.price, city: (req.body.city).toLowerCase(), mobileNumber: req.body.mobileNumber, productImageUrl: req.body.productImageUrl } } })
        .then((result) => {
            console.log("result", result);
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
// const Admin = new mongoose.model("Admin", adminSchema);
// const Organisation = new mongoose.model("Organisation", organisationSchema);

// passport.use(new JWTstrategy({
//     // We expect the user to send the token as a query paramater with the name 'token'
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),

//     // Secret we used to sign our JWT
//     secretOrKey: config.jwtkey,

//     //this will help you to pass request body to passport
//     passReqToCallback: true
// }, async (req, token,done) => {

//     //req becomes the first parameter
//     // now you can access req.body here
// });
// passport.use(new JwtStrategy(opts, function (req,jwt_payload, done) {
//     req.role=jwt_payload.role;
//     if (jwt_payload.role === "user") {
//         User.findOne({ id: jwt_payload.sub }).then(function (user) {
//             // console.log(user);
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         }).catch((err) => {
//             return done(err, false);
//         });
//     } else if (jwt_payload.role === "admin") {
//         Admin.findOne({ id: jwt_payload.sub }).then(function (admin) {
//             if (admin) {
//                 return done(null, admin);
//             } else {
//                 return done(null, false);
//             }
//         }).catch((err) => {
//             return done(err, false);
//         });
//     } else if (jwt_payload.role === "organisation") {
//         Organisation.findOne({ id: jwt_payload.sub }).then(function (organisation) {
//             if (organisation) {
//                 console.log("organisation is ", organisation);
//                 return done(null, organisation);
//             } else {
//                 return done(null, false);
//             }
//         }).catch((err) => {
//             return done(err, false);
//         });
//     }
// }));


app.post("/sendMobOtp", (req, res) => {
    const sendOtp = (Math.floor(Math.random() * 999999) + 1).toString();
    const send = "Your mobile verification OTP is " + sendOtp;
    console.log(send);
    client.messages
        .create({
            body: send,
            from: twilioNumber,
            to: req.body.mob
        })
        .then(message => console.log(message.sid));
    res.json({ message: sendOtp });



});

app.post("/sendEmailOtp", (req, res) => {
    const otp = Math.floor((Math.random()) * 9999) + 1;
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
        to: req.body.email,
        subject: 'Otp',
        text: otp.toString()
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {

            console.log(error);
            res.json({ message: null });
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({ message: otp.toString() });
    // console.log();
});

app.get("/signup", (req, res) => {
    res.redirect("/signup");
});
app.get("/adminRouteBackend", passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.role);
    if (req.role !== "admin") {
        res.status(401).send({
            success: false,
            message: "Unauthorized",
        });
    }
    res.status(200).send({
        success: true,
        message: "You are logged in",
        // admin: {
        //     id: req.admin._id,
        //     username: req.admin.username
        // }
    });
});

app.post("/adminSignup", (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    });
    admin.save().then((admin) => {
        res.send({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                username: admin.username,
            }
        });
    }).catch((err) => {
        res.send({
            success: false,
            message: "Admin not created",
            error: err
        });
    });
});

app.post("/userSignup", (req, res) => {

    const user = new User({
        username: req.body.email,
        password: hashSync(req.body.password, 10),
        mobileNumber: req.body.mob
    });
    user.save().then((user) => {
        res.send({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
            }
        });
    }).catch((err) => {
        res.send({
            success: false,
            message: "User not created",
            error: err
        });
    });
});

app.get("/userWelcomeBackend", passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.role !== "user") {
        return res.status(401).send({
            success: false,
            message: "Unauthorized",
        });
    }

    res.status(200).send({
        success: true,
        message: "You are logged in",
        // user: {
        //     id: req.user._id,
        //     username: req.user.username
        // }
    });
});
app.post("/userLoginBackend", (req, res) => {
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
            role: "user"
        };
        const token = "Bearer " + jwt.sign(payload, mySecret, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    }).catch((err) => {
        console.log(err);
    });
});



app.post("/adminLoginBackend", (req, res) => {
    Admin.findOne({ username: req.body.username }).then(function (foundAdmin) {
        if (!foundAdmin) {
            res.status(401).send({
                success: false,
                message: "Admin not found",
            });
        }
        if (!compareSync(req.body.password, foundAdmin.password)) {
            res.status(401).send({
                success: false,
                message: "Password is incorrect",
            });
        }
        const payload = {
            id: foundAdmin._id,
            username: foundAdmin.username,
            role: "admin"
        };
        const token = "Bearer " + jwt.sign(payload, mySecret, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: "Admin logged in successfully",
            token: token
        });
    }).catch((err) => {
        console.log(err);
    });
});



// Creating Organisation



app.post("/organisationCreateBackend", passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.role !== "admin") {
        return res.status(401).send({
            success: false,
            message: "Unauthorized access",
        });
    }
    const verificationCode = (Math.floor((Math.random()) * 99999999) + 1).toString();
    console.log("verification code is ", verificationCode);
    const organisation = new Organisation({
        username: req.body.username,
        verificationCode: verificationCode
    });
    organisation.save().then((organisation) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD
            }
        });
        var mailOptions = {
            from: process.env.MY_EMAIL,
            to: req.body.username,
            subject: "Verification Code for Signup on docify",
            text: "Your verification code is " + verificationCode + ", valid for only 1 time use for signup."
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send({
            success: true,
            message: "Organisation created successfully",
            organisation: {
                id: organisation._id,
                username: organisation.username,
            }
        });
    }).catch((err) => {
        res.send({
            success: false,
            message: "Organisation not created",
            error: err
        });
    });
});

app.post("/organisationSignup", (req, res) => {
    Organisation.findOneAndUpdate({ username: req.body.username },
        {
            $set: {
                verificationCode: null,
                password: hashSync(req.body.password, 10),
                name: req.body.name
            }
        }
    ).then(function (foundOrganisation) {
        if (!foundOrganisation) {
            res.status(401).send({
                success: false,
                message: "Organisation not found",
            });
        }
        if (req.body.verificationCode !== foundOrganisation.verificationCode) {
            res.status(401).send({
                success: false,
                message: "Verification code is incorrect",
            });
        }
        res.send({
            success: true,
            message: "Organisation signed up successfully",
            organisation: {
                id: foundOrganisation._id,
                username: foundOrganisation.username
            }
        });
    }
    ).catch((err) => {
        console.log(err);
        res.send({
            success: false,
            message: "Unable to signup organisation",
            error: err
        });
    });
});

app.post("/organisationLogin", (req, res) => {
    console.log(req.body);
    Organisation.findOne({ username: req.body.username }).then(function (foundOrganisation) {
        if (!foundOrganisation) {
            return res.status(401).send({
                success: false,
                message: "Organisation not found",
            });
        }
        if (!compareSync(req.body.password, foundOrganisation.password)) {
            return res.status(401).send({
                success: false,
                message: "Password is incorrect",
            });
        }
        const payload = {
            id: foundOrganisation._id,
            username: foundOrganisation.username,
            role: "organisation"
        };
        const token = "Bearer " + jwt.sign(payload, mySecret, { expiresIn: "1d" });
        return res.status(200).send({
            success: true,
            message: "Organisation logged in successfully",
            token: token,
        });
    }).catch((err) => {
        console.log(err);
    });
});

app.get("/organisationRoute", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.role !== "organisation") {
        return res.status(401).send({
            success: false,
            message: "Unauthorized access",
        });
    }
    res.send({
        success: true,
        message: "You are logged in",

    });
});



app.listen(process.env.MY_PORT, (req, res) => {
    console.log("Server stated at port 2000");
});