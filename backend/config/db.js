const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { // mongoose library
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongoDB Connected : ${conn.connection.host}`.cyan.underline)
    }
    catch (error) {
        console.log(`Error : ${error.message}`.red.bold);
        process.exit();
    }
};

module.exports = connectDB;