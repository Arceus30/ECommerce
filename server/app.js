require("dotenv").config();
const express = require("express");
const { DatabaseConnection } = require("./Helper");

// database connection
DatabaseConnection.connectDB();

// server object
const app = express();

app.get("/", (req, res, next) => {
    res.json({ message: "YAY!!" });
});

// sever launched
const port = process.env.PORT;
app.listen(port, () => {
    console.log(
        `Server is running on ${process.env.NODE_ENV} on port: ${port}`
    );
});
