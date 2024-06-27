import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token, password} = reqBody;
        
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt:Date.now()}})
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        
        
        


        return NextResponse.json({
            message: "Password change successfully",
            success: true,
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:  500})
    }
}