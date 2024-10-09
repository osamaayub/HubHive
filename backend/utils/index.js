import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);

}

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}