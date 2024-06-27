import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { cookies } from "next/headers";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, email } = reqBody;
        
        const user = await User.findOne({
          $or:[
          {_id: userId},
          {email : email}
        ]})
        console.log(user);
        if(!user){
          return NextResponse.json({message: "User doses not exist"}, {status:400})
        }
        if (userId || email) {
            const response = NextResponse.json({
            message: "Mail sent",
            success: true,
        })

          response.cookies.set("token", "", 
            { httpOnly: true, expires: new Date(0)
            });
          
          await sendEmail({email: user.email, emailType: "RESET", userId: user._id});
          return response
        }


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
