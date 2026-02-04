import getDataFromToken from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dBconnect from "@/dbConfig/dbConfig";

dBconnect()

export async function GET(request :NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select("-password") //finds a user by id and remove the password from the output
        return NextResponse.json({
            message: "User found",
            data: user
        })
       
    } catch (error :unknown) {
       const errorMessage = error instanceof Error ? error.message : 'not authorized'
       return NextResponse.json({error: errorMessage}, {status: 500})
    }
}
