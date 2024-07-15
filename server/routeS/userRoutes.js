const express = require("express");
const { userMiddleware } = require("../middlewares");
const { userController } = require("../controllers");
const router = express.Router();

// REGISTER  || METHOD POST
router.post(
    "/register",
    userMiddleware.validateRegister,
    userController.registerUser
);

// LOGIN || METHOD POST
router.post("/login", userMiddleware.validateLogin, userController.loginUser);

module.exports = router;
