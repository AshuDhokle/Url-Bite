import { UrlShortenerService } from "@/services/urlShorternerService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json();
        const {originalUrl} :any = reqBody;
        
        const shorternerService = new UrlShortenerService;
        const shortUrl = await shorternerService.shortenUrl(originalUrl); 
        
        return NextResponse.json({
            url:shortUrl,
            success:true,
        },{status:200});
    } catch (error : any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }
}