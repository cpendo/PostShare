const jwt = require("jsonwebtoken");

//generate token that expires in 24h
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: "2h"})
}

module.exports = generateToken