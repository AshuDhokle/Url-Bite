import mongoose,{Document,Model} from "mongoose";

export interface IUrl extends Document {
    originalUrl:string,
    shortUrl:string,
    clickCount?:number
}

const UrlSchema = new mongoose.Schema<IUrl>({
    originalUrl:{
        type: String,
        required:[true,'First Provide original URL'],
    },
    shortUrl:{
        type: String,
        required:[true,'Provide short URL'],
    },
    clickCount:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Url : Model<IUrl> = mongoose.models.Url || mongoose.model<IUrl>('Url',UrlSchema);

export default Url;