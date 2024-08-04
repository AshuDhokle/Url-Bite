import { NextRequest,NextResponse } from "next/server";
import User, { IUser } from "@/models/userModel";
import { getUserDataFromToken } from "@/helper/getUserDataFromToken";

import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getUserDataFromToken(request);
        
        const user : IUser | null = await User.findOne({_id:userId}).select('-password')
        
        if(user){
            return NextResponse.json(
                {
                    message:'user details found',
                    success:true,
                    user:user
                },
                {status:200}
            )
        }
        
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:400},
        )
    }
}