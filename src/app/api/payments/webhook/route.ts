import Stripe from 'stripe'
import { headers } from "next/headers";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from '@/dbconfig/dbConfig';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
  apiVersion: "2024-06-20",
  typescript:true,
})
connect();
export async function POST(request:NextRequest) {
  
  const reqBody = await request.text();
  
  const signature = headers().get('Stripe-Signature') as string;

  let event : Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    return NextResponse.json({message:"invalid signature"},{status:400})  
  }

  const session = event.data.object as Stripe.Checkout.Session;
  
  
  if(event.type === 'checkout.session.completed'){
   // const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    const checkoutSessionCompleted :any = event.data.object;
    const userId = checkoutSessionCompleted.client_reference_id;
    const amount = checkoutSessionCompleted.amount_total
    const subscriptionId : string = checkoutSessionCompleted.subscription;
    
    const user = await User.findById(userId);
    
    if(!user){
      return NextResponse.json({
        message:'Invalid request, not authorized',
        success:false,
      },{status:400})
    }
    
    user.subscriptionId = subscriptionId
    user.plan = amount === 19900 ? 'Monthly' : 'Yearly'
    user.count = amount === 19900 ? 100 : 1500
    await user.save();

    return NextResponse.json({
      message:'Payment Succeeded',
    },{status:200})
  }

  return NextResponse.json({
    message:'Ok',
  },{status:200})
}