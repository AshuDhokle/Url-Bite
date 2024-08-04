import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function getUserDataFromToken(request:NextRequest) {
    try {
        const token = request.cookies.get('token')?.value || '';
        if(!token){
            return ''
        }

        const decodedToken : any = jwt.verify(token,process.env.SECRET!);

        return decodedToken.id;

    } catch (error : any) {
        throw new Error(error.message)
    }
}
