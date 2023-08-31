import dotenv from "dotenv"
dotenv.config()
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';
import { referralCode } from '../refCodeGenerate/RefCodeGenerate.js';
const secreteKey = process.env.SECRET_KEY;

export const signUp = async (request, response, next) => {
    try {
        const { fName, lName, email, password, confirmPassword, refCode } = request.body;
        if (password !== confirmPassword) {
            return response.status(400).json({ message: "password not match" });
        }
        request.body.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        let NewUser;
        if (refCode) {
           NewUser = await User.findOne({ refCode });
            if (!NewUser) {
                return response.status(401).json({ message: "referral code not found" });
            }
            else{
                const per = (10 / 100) * 100;
                NewUser.refCodeCount++;
                if (NewUser.refCodeCount === 1) {
                    NewUser.tokenBonus += per * (50 / 100);
                }
                else if (NewUser.refCodeCount === 2) {
                    NewUser.tokenBonus += per * (30 / 100);
                }
                else {
                    NewUser.tokenBonus += per * (20 / 100);
                }
                await NewUser.save();
            }
        }
        let user = await User.create({
            fName, lName, email, password: request.body.password,
            refCodeBy: NewUser ? NewUser._id : null,
            refCode: referralCode
        });
        return response.status(200).json({ user: user, message: "signup successful", status: true });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "internal server error", status: false });
    }
};

export const signIn = async (request,response,next)=>{
    try{
      let user = await User.findOne({email: request.body.email});
      let status = user ? await bcrypt.compare(request.body.password,user.password): false;
      let payload  = {subject: request.body.email};
      const token = jwt.sign(payload,secreteKey)
      return status ? response.status(200).json({message: 'Signin Success', status: true, user: {...user.toObject(),password: undefined,token: token}}) :
               response.status(401).json({message: 'Unauthorized user', status: false});
    }
    catch(err){
      return response.status(500).json({error:"Internal Server Error", status: false});
    }
}

export const totalUserCount = async  (request, response, next) => {
    try {
        const user = await User.find({ refCodeBy: request.body.id });
        return user ? response.status(200).json({ user: user,total:user.length, status: true }) : response.status(401).json({ error: "not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false })
    }
}
