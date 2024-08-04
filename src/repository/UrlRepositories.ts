import Url,{IUrl} from "@/models/urlModel";
import { connect } from "@/dbconfig/dbConfig";

export default class UrlRepository{
    private urlModel;
    constructor(){
       connect();
       this.urlModel = Url
    }

    async getUrlById(id:string) : Promise<IUrl | null>{
        return await this.urlModel.findById(id).lean();
    } 

    async getUrlByShortUrl(url:string) : Promise<IUrl | null>{
        return await this.urlModel.findOne({shortUrl:url}).lean();
    }

    async getUrlByOriginalUrl(url:string) : Promise<IUrl | null>{
        return await this.urlModel.findOne({originalUrl:url}).lean();
    }

    async getAllUrl() : Promise<IUrl | null>{
        return await this.urlModel.find().lean();
    }

    async deleteUrl(id:string) : Promise<IUrl | null>{
        return await this.urlModel.findByIdAndDelete({_id:id}).lean();
    }

    async createUrl(originalUrl:string,shortUrl:string) : Promise<IUrl | null>{
       return await this.urlModel.create({shortUrl,originalUrl})
    }

    async updateUrlClickCount(urlId:string) : Promise<IUrl | null>{
        return await this.urlModel.findByIdAndUpdate(urlId,{$inc:{clickCount:1}},{new:true});
    }
}