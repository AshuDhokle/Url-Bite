import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getUserDataFromToken } from '@/helper/getUserDataFromToken';
import User from '@/models/userModel';
import { connect } from '@/dbconfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
connect();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
    typescript: true,
});

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {password} = reqBody;
        const userId = await getUserDataFromToken(request);
        if(!userId){
            return NextResponse.json({
                message:'Invalid Token',
                success:false,
            },{status:401})
        }

        const user = await User.findById(userId);

        if(!user){
            return NextResponse.json({
                message:'user not found',
                success:false,
            },{status:404})
        }
        
        // if any error occurs check for password and bcryptjs  

        const comparePassword = await bcryptjs.compare(password,user.password);
        
        if(!comparePassword){
            return NextResponse.json({
                message:'Wrong Credentials'
            },
            {status:400},
            )
        }

        if(!user.subscriptionId){
            return NextResponse.json({
                message:'Invalid Request',
                success:false,
            },{status:400})
        }
        
        await stripe.subscriptions.cancel(user.subscriptionId);

        const c = user.count;

        user.subscriptionId = 'none',
        user.plan = 'none',
        user.count = c < 50 ? 0 : 50

        await user.save();

        return NextResponse.json({
            message:'Subscription Deleted',
            success:true,
        },{status:200});

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}