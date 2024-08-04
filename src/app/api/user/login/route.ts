import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import User,{IUser} from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username,password} = reqBody;
        
        const user = await User.findOne({username:username});
         
        if(!user){
            return NextResponse.json({
                message:'User not found',
            },
            {status:404},
            )
        }
        
        const comparePassword = await bcryptjs.compare(password,user.password);
        
        if(!comparePassword){
            return NextResponse.json({
                message:'Wrong Credentials'
            },
            {status:400},
            )
        }
        
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email            
        }

        const token = await jwt.sign(tokenData,process.env.SECRET,{expiresIn:'1d'});
        
        const {password:string, ...loggedUSer} = user; 

        const respose = NextResponse.json({
            message:'Logged in Successfully',
            success:true,
            user:loggedUSer,
        })

        respose.cookies.set('token',token,{
            httpOnly:true
        });

        return respose
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error:error.message,
        },{status:500})
        
    }
}
