import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dBconnect from "@/dbConfig/dbConfig";

export async function POST(request :NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        //check if user exist
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: "User does not exists"},
            {status: 400})
        }
        console.log("user exists");
        

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: "Email or Password is not correct"}, {status: 400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1h"})

        const response = NextResponse.json({
            message: 'Login Successfully',
            success: true
            
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error :unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
        return NextResponse.json({error: errorMessage}, {status: 500})
    }
}

dBconnect()