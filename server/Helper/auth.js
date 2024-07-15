const bcrypt = require("bcryptjs");

const hashPassword = async (plainPwd) => {
    try {
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(plainPwd, saltRounds);
        return hashedPwd;
    } catch (e) {
        console.log(error);
    }
};
const comparePassword = async (plainPwd, hashedPwd) => {
    return await bcrypt.compare(plainPwd, hashedPwd);
};

module.exports = {
    hashPassword,
    comparePassword,
};
