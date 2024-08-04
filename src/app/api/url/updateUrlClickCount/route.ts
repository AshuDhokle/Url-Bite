import { UrlShortenerService } from "@/services/urlShorternerService";
import { NextRequest,NextResponse } from "next/server";

export async function PUT(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {urlId} = reqBody;
        
        const shorternerService = new UrlShortenerService;
        
        const response = await shorternerService.updateUrlClickCount(urlId);
        
        if(response){
            return NextResponse.json({
                message:'count incremented',
                count:response?.clickCount,
                
            },{status:200})
        }


    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        },{status:500})
    }
}