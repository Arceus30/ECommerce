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

module.exports = router;
