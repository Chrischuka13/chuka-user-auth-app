import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import dBconnect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

dBconnect()

export async function POST(request :NextRequest) {
    try {
        // server requests for user email to check if email/user exists
        const { email } = await request.json()
        const newUser = await User.findOne({ email })

        if (!newUser) {
            NextResponse.json({error: "User not found"}, {status: 400})
        }
        console.log(newUser);

        // send reset link
        await sendEmail({email: newUser.email, emailType: "RESET", userId: newUser._id})

        return NextResponse.json({message: "reset link sent successfully", success: true})
        
    } catch (error :any) {
       return NextResponse.json({error: error.message}, {status: 500})
    }
}