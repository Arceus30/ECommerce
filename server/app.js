require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const { DatabaseConnection } = require("./Helper");
const { userRoutes } = require("./routes");
// database connection
DatabaseConnection.connectDB();

// server object
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    res.json({ message: "YAY!!" });
});

app.use(process.env.USER, userRoutes);

// sever launched
const port = process.env.PORT;
app.listen(port, () => {
    console.log(
        `Server is running on ${process.env.NODE_ENV} on port: ${port}`
    );
});
