import express from 'express';
import { signUp, signIn, totalUserCount } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/tokenVerification.js';
const route = express.Router();

route.post('/signup',signUp);
route.post('/signin',signIn);
route.post("/totalusercount",verifyToken,totalUserCount);

export default route;