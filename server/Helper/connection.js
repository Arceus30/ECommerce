const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log(`Server is connected to Database`);
    } catch (e) {
        console.log(`Server Database Connection error: ${e}`);
    }
};

module.exports = { connectDB };
