import mongoose ,{Document, Model,Types} from "mongoose";

export interface IUser extends Document {
  username : string;
  email : string;
  password : string;
  isVerified ?: boolean;
  urls?: Array<Types.ObjectId>;
  plan:string;
  forgotPasswordToken ?: string;
  forgotPasswordTokenExpiry ?: Date;
  verifyToken ?: string;
  verifyTokenExpiry ?: Date; 
  count : number;
  subscriptionId: string;
}


const userSchema = new mongoose.Schema<IUser>({
  username : {
    type : String,
    required:[true,'Please provide a username'],
    unique:true,
  },
  email : {
    type : String,
    required:[true,'Please provide an email'],
    unique:true,
  },
  password : {
    type : String,
    required:[true,'Please provide a password'],
  },
  urls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Url',
  }],
  isVerified:{
    type:Boolean,
    default:false,
  },
  plan:{
    type:String,
    default:'none'
  },
  count:{
    type:Number,
    default:50,
  },
  subscriptionId: {
    type: String,
    default: 'none',
  },
  forgotPasswordToken:String,
  forgotPasswordTokenExpiry:Date,
  verifyToken: String,
  verifyTokenExpiry:Date,  
})


const User : Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User',userSchema);

export default User;