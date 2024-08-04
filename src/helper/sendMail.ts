import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10);
        
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry : Date.now() + 3600000
            })
        }else if(emailType === 'RESETPASSWORD'){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry : Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERID,
              pass: process.env.MAILTRAP_PASSWORD
            }
        });
        
        const mailOptions = {
            from : 'ashudhokle@gmail.com',
            to:email,
            subject:emailType === 'VERIFY' ? 'verify' : 'reset password',
            html:`<p>Click <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }
             
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse

    } catch (error : any) {
        throw new Error(error.message)
    }
}