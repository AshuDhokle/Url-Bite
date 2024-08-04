import { getUserDataFromToken } from "@/helper/getUserDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { IUrl } from "@/models/urlModel";
export async function PUT(request:NextRequest) {
    try {
        
        const reqBody = await request.json();
        const userId = await getUserDataFromToken(request)
        const {url} = reqBody;
        
        //still not done
        //add the url to the user only if it is new
        
        if (!url || !url._id) {
            return NextResponse.json({
                message: 'URL ID is required',
                success: false,
            }, { status: 400 });
        }

        const user = await User.findById(userId);
        
        if(user?.count === 0){
            return NextResponse.json({
                message:'Limit Reached, Subscribe to extend limit',
                success:false,
            },{status:400})
        }

        if (!user) {
            return NextResponse.json({
                message: 'Invalid User Id',
                success: false,
            }, { status: 404 });
        }

        const isUrlPresent = user.urls?.some((existingUrl:any) => existingUrl.toString() === url._id);
        
        if (isUrlPresent) {
            return NextResponse.json({
                message: 'URL already exists for the user',
                success: false,
            }, { status: 400 });
        }
        
        const c : number = user.count;
        
        user.urls?.push(url._id);
        user.count = (c - 1)
        await user.save();
        
        return NextResponse.json({
            message:'Added to user data',
            success:true,
        },{status:200});

    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        },{status:500})
    }
}