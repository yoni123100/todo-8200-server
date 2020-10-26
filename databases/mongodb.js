require('dotenv/config');

const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ", process.env.MONGODB_URL);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
        });
    });
}


module.exports = {connectDB};
