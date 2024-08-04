import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;

        const user = await User.findOne({
            verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json({
                error:'Invalid Token',
                success:false,
            },{status:404})
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message:'Email verified successfully',
            success:true,
        },{status:202})

    } catch (error:any) {
       return NextResponse.json({
        error:error.message,
       },{status:500})   
    }
}
