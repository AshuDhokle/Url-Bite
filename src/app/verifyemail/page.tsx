'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Link from 'next/link';
const VerifyEmail = () => {
    const [token,setToken] = useState("");
    const [isVerified,setIsVerified] = useState(false);
    const [error,setError] = useState(false);
    
    const verifyemail = async(token:string) =>{
        try {
            const response = await axios.post('/api/user/verifyemail',{token:token})
            const data = await response.data
            console.log(data);
            
            if(data.success){
                toast('Email Verified');
                setIsVerified(true)
            }
        } catch (error:any) {
            toast.error(error.message)   
        }
    }

    useEffect(()=>{
       const urlToken = window.location.search.split('=')[1];
       setToken(urlToken || '');
    },[])
    
    useEffect(()=>{
     if(token.length > 0){
        verifyemail(token);
     }
    },[token])

    return (
        <div className='w-full h-screen flex flex-col  '>
        <nav className='w-full p-2 mb-2 bg-purple-500 shadow-lg text-white text-lg'>Email Verification</nav>
        {
            isVerified && (
                <div className='w-full flex flex-col items-center justify-center'>
                    <h2 className='m-2 text-xl'>Email Verified Successfully</h2>
                    <Link href={"/login"} className='p-1 px-5 rounded-md text-white bg-purple-400 hover:bg-purple-500'>
                      Login
                    </Link>
                </div>
            )
        }
        {
            error && (
                <div className='w-full flex flex-col items-center justify-center'>
                 <h2 className='m-2 text-xl'>Verification Failed</h2>
                 <h2>Please try again by clicking the link provided on email</h2>
                 <Link href={"/login"}>
                  Login
                 </Link>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail