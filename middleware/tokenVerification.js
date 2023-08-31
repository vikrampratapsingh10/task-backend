import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const secreteKey = process.env.SECRET_KEY;
export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) 
       throw new Error();
    jwt.verify(token, secreteKey);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized request", status: false });
  }
};
