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
        return res
            .status(201)
            .json({
                message: "User created successfully",
                success: true,
                userId: userCreated._id,
            });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Registeration failed",
            e,
        });
    }
};

module.exports = {
    registerUser,
};
