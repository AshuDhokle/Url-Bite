import { NextRequest, NextResponse } from "next/server";
import { getUserDataFromToken } from "@/helper/getUserDataFromToken";
import User from "@/models/userModel";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserDataFromToken(request);

    if (!userId) {
      return NextResponse.json({
        message: 'Invalid user ID',
        success: false,
      }, { status: 400 });
    }

    // Aggregation pipeline
    const userWithUrls = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },  // Match the user by ID
      { 
        $lookup: {
          from: 'urls',  // The collection to join with
          localField: 'urls',  // Field from the input documents (User schema field)
          foreignField: '_id',  // Field from the documents of the "from" collection (Url schema field)
          as: 'urls'  // The name of the array field to add to the input documents
        }
      },
      {
        $project: {
          username: 1,  // Include fields you want
          email: 1,
          urls: 1  // Include the joined URLs
        }
      }
    ]);
     
    if (!userWithUrls || userWithUrls.length === 0) {
      return NextResponse.json({
        message: 'User not found',
        success: false,
      }, { status: 404 });
    }
    
    return NextResponse.json({
      message: 'All user URLs',
      urls: userWithUrls[0].urls,
      success: true,
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}
