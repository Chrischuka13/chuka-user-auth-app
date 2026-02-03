import dBconnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

dBconnect()

export async function POST(request :NextRequest) {
    try {
        //get the token from the user
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);
        
        //server checks if the token the user provided matches  
        const user = await User.findOne({verifyToken: token,
            verifyTokenExpire: {$gt: Date.now()}
        })

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        //set userverified to true, and reset tokens back so no one can use it
        user.isVerified = true 
        user.verifyToken = undefined
        user.verifyTokenExpire = undefined

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
        
    } catch (error :any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
} 