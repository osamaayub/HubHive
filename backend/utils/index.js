const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);

}

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}
module.exports = { createToken, comparePassword, hashPassword, verifyToken }