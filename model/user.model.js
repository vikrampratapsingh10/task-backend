import mongoose from "mongoose";
const userSchema = mongoose.Schema({
        fName: {
            type: String,
            require: true,
        },
        lName: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true

        },
        refCode: {
            type: String,
        },
        refCodeBonus:{
            type:String,   
        },
        refCodeCount: {
            type: Number,
            default: 0,
        },
        refCodeBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        tokenBonus: {
            type: Number,
            default: 100,
        }

    }
)

export const User = mongoose.model('user', userSchema);
