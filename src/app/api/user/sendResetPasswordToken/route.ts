import { getUserDataFromToken } from "@/helper/getUserDataFromToken";
import { sendEmail } from "@/helper/sendMail";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try {

        const {email} = await request.json();
        let userId = await getUserDataFromToken(request);
        if(userId.length <= 0){
            const user = await User.findOne({email:email})
            userId = user?._id;    
        }
        
        const response = await sendEmail({email:email,emailType:"RESETPASSWORD",userId:userId});
        
        return NextResponse.json({
            messsage:'Reset Password Link Sent To Your Email',
            success:true
        },{status:202})

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}