import { NextRequest,NextResponse } from "next/server";
import { UrlShortenerService } from "@/services/urlShorternerService";
export async function GET(request: NextRequest) {
    try {
        
        const { searchParams } = new URL(request.url);
        const shortUrl : any = searchParams.get('shortUrl');
        const shorternerService = new UrlShortenerService;
        const url = await shorternerService.getUrlByShortUrl(shortUrl);
        
        return NextResponse.json({
            message:`Redirecting to ${url?.originalUrl}`,
            url:url?.originalUrl,
            success:true
        },{status:200})
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
        },{status:500})
    }
}
