const mongoose= require("mongoose");

const mongooseURI="mongodb://127.0.0.1:27017/skyscoll";

const connectToMongo = () =>{
    mongoose.connect(mongooseURI)
    .then(console.log("Connected to MongoDB"))
}

module.exports = connectToMongo