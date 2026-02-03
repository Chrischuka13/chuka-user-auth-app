import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dBconnect from "@/dbConfig/dbConfig";

dBconnect()

export async function POST(request :NextRequest){
    try {
        const { token, password } = await request.json()
        const user = await User.findOne({forgotPasswordToken: token,
        forgotPaswordExpire: { $gt: Date.now()},
        })

        if (!user) {
            return NextResponse.json({error: "invalid or expired token"}, {status: 400})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword
        user.forgotPasswordToken = undefined
        user.forgotPaswordExpire = undefined
        await user.save()

        return NextResponse.json({
            message: "Password reset successfully",
            status: true
        })

    } catch (error :any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}