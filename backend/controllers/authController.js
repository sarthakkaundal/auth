const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne( {email});
        if(existingUser){
            return res.status(400).json( {message: "user already  exists"});
        }

        const hashPass = await bcrypt.hash(password, 10);

        const user = User.create({
            name,
            email,
            password : hashPass
        });

        return res.status(201).json({message: "user created successfuly"});

    }catch(error){
        return res(500).json( {error: error.message});
    }
}

const login = async (req, res) => {
    try{

        const {email, password} = req.body;

        const user = await User.findOne( {email});

        if(!user){
            return res.status(400).json( {message: "invalid credentials"});
        }

        const rightPass = await bcrypt.compare(password, user.password);

        if(!rightPass){
            return res.status(400).json( {message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            message : "login successful",
            token
        })

    }catch(error){
        return res(500).json( {error: error.message} );
    }
}

module.exports = {signup, login}