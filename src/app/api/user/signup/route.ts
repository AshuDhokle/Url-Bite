import { connect } from "@/dbconfig/dbConfig";
import bcryptjs from 'bcryptjs'
import { NextRequest,NextResponse } from "next/server";
import User, { IUser } from "@/models/userModel";
import { sendEmail } from "@/helper/sendMail";
connect();

export async function POST(request:NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        
        const alreadyRegistered : IUser | null = await User.findOne({email});

        if(alreadyRegistered){
            return NextResponse.json(
                {
                    message:'Already Registered with this email/username.',
                    success:false,
                },
                {status:400}
            )
        }
        
        const hashedPassword = await bcryptjs.hash(password,10);

        const newUser : IUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()

        await sendEmail({email:email,emailType:'VERIFY',userId : savedUser._id})

        return NextResponse.json(
            {
                message:'User Registered Successfully',
                success:true,
                user:savedUser
            },
            {status:200}
        )

    } catch (error:any) {
        console.log(error);
        
        return NextResponse.json(
            {
                error:error.message,
            },
            {
                status:500,
            }
        )
    }
}