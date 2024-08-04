import { IUrl } from "@/models/urlModel";
import UrlRepository from "@/repository/UrlRepositories";
import { nanoid } from "nanoid";
export class UrlShortenerService{
    private UrlRepository;
    constructor(){
       this.UrlRepository = new UrlRepository()
    }

    async shortenUrl(originalUrl : string):Promise<IUrl| null>{
        let url = await this.UrlRepository.getUrlByOriginalUrl(originalUrl)
        if(url){
            return url;
        }

        let shortUrl = nanoid();
        url = await this.UrlRepository.getUrlByShortUrl(shortUrl);

        while(url){
            shortUrl = nanoid();
            url = await this.UrlRepository.getUrlByShortUrl(shortUrl);
        }

        const response = await this.UrlRepository.createUrl(originalUrl,shortUrl);

        return response;
    }

    async getAllUrl() : Promise<IUrl | null>{
        return await this.UrlRepository.getAllUrl();
    }

    async getUrlByShortUrl(shortUrl:string) : Promise<IUrl | null >{
        return await this.UrlRepository.getUrlByShortUrl(shortUrl);
    }

    async updateUrlClickCount(urlId:string) : Promise<IUrl | null >{
        
        return await this.UrlRepository.updateUrlClickCount(urlId);
    }
}