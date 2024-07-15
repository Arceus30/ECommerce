const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Auth } = require("../Helper");

const registerUser = async (req, res, next) => {
    try {
        const { user } = req.body;

        // check for existing user
        const userFound = await User.findOne({ email: user.email });
        if (userFound)
            return res
                .status(200)
                .json({ message: "User already exists", success: true });

        // register user
        user.password = await Auth.hashPassword(user.password);

        const userCreated = new User(user);
        await userCreated.save();
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            userId: userCreated._id,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Registration failed",
            e,
        });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { user } = req.body;

        // check if user does not exist
        const userFound = await User.findOne({ email: user.email });
        if (!userFound)
            return res
                .status(500)
                .json({ message: "User does not exists", success: false });

        // compare password
        const isCorrect = await Auth.comparePassword(
            user.password,
            userFound.password
        );
        if (!isCorrect)
            return res.status(500).json({
                message: "Incorrect email or password",
                success: false,
            });

        // jwt token creation
        const payload = {
            id: userFound._id,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.status(200).json({
            message: "User login successfully",
            success: true,
            token,
            user: userFound,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Login failed",
            e,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
