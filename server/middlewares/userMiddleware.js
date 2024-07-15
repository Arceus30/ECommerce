const { userSchema } = require("../schemas");

const validateRegister = (req, res, next) => {
    const { error } = userSchema.register.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const msg = error.details.map((el) => el.message);
        return res.status(500).json({ message: msg, error });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const { error } = userSchema.login.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        const msg = error.details.map((el) => el.message).join(",");
        return res.status(500).json({ message: msg });
    }
    next();
};

module.exports = {
    validateRegister,
    validateLogin,
};
