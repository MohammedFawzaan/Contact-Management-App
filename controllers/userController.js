const user = require('../models/userModel'); 
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const process = require('process');

const Register = asyncHandler(async (req, res)=>{

    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the details");
    }

    // to check whether user is already registred or not
    // userAvailable will store the object which matches to email enterd from req.body.
    const userAvailable = await user.findOne({ email }); 
    // console.log(userAvailable);
    if(userAvailable) {
        res.status(400);
        throw new Error("user already registered");
    }

    // hashing the password using bcrypt because cannot store raw password.
    const hashpassword = await bcrypt.hash(password, 10);
    // console.log("Hash Password"+hashpassword);

    // creating newuser with username, email, password.
    const newuser = new user({
        username: username,
        email: email,
        password: hashpassword
    }).save();

    if(newuser) {
        res.status(200).json(newuser);
    } else {
        res.status(404);
        throw new Error("");
    }
});

const Login = asyncHandler(async (req, res)=>{

    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('Please fill all details');
    }
    const userAvailable = await user.findOne({email});
    // res.json({userAvailable});
    
    if(userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
        const accessToken = jwt.sign(
            {
                // userAvailable Payload 
                userAvailable: {
                    username: userAvailable.username,
                    email: userAvailable.email,
                    id: userAvailable.id
                }
            }, 
            "fawzaan123",
            {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error("Details Not Valid");
    }

});

const Current = asyncHandler(async (req, res)=>{
    res.json(req.userAvailable);
});

module.exports = {Register, Login, Current};