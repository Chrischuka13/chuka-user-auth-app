import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dBconnect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

// client post request to sign up(create an account)
export async function POST(request: NextRequest){
    try {
        //start when user inputs values
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        // create new user
        const newUser = new User ({
            username,
            email,
            password: hash
        })
        // save new user
        await newUser.save()

        //send verification email
        await sendEmail({email: newUser.email, emailType: "VERIFY", userId: newUser._id})
        
        return NextResponse.json({
            message: "user created successfully",
            success: true,
            newUser,
        }, {status: 201})
        
    } catch (error: any) {
        console.error("signup API error", error);
        return NextResponse.json({error: error.message}, {status:500})
    }
}

dBconnect()