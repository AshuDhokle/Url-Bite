import User, { IUser } from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token,password} = reqBody;

        const user = await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordTokenExpiry:{$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({
                message:'Invalid Token',
                success:false,
            },{status:404})
        }
        
        const hashedPassword = await bcryptjs.hash(password,10);
        user.password = hashedPassword
        
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save();

        return NextResponse.json({
            message:'Password Reset Successfully',
            success:true,
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        },{status:500})
    }
}