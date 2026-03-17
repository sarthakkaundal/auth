const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("mongoDB connection successful");
    }catch(error){
        console.log("connection failed, error: ", error);
        process.exit(1);   //1 is for fail, 0 is for successful
    }
}

module.exports = connectDB;