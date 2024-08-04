'use client'

import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import { ClockLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
const Signup = () => {
    const router = useRouter();  

    const [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
        cnfPassword:''
    })

    const [hidePassword,setHidePassword] = useState(true);
    const [hideCnfPassword,setHideCnfPassword] = useState(true);
    const [loading,setLoading] = useState(false);
    const handleSignup = async(e:any)=>{
        e.preventDefault();
        try {
          setLoading(true);
          const response = await axios.post('/api/user/signup',user); 
          const data = response.data; 
          if(data.success){
            toast.success(data.message);
            router.push('/login')
          }else{
            toast.error(data.message)
          }
        } catch (error : any) {
          toast.error(error.message);
        }finally{
          setLoading(false);
        }
    }

  return (
    <div className='flex flex-col w-full h-screen items-center justify-center'>
        <Toaster/>
        <h1 className='text-xl text-blue-500 font-semibold'>Signup</h1>
        <form onSubmit={handleSignup} className='flex flex-col p-4 shadow-xl'>
            <TextField label="username" variant="standard" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} sx={{m:2, my:1}}/>
            <TextField label="email" variant="standard" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} sx={{m:2, my:1}}/>
            <div className='flex flex-row items-center'>
                <TextField label="password" type={hidePassword ? 'password' : 'text'} variant="standard" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} sx={{m:2, my:1}}/>
                {
                  hidePassword ? <FaEyeSlash className='size-6 cursor-pointer' onClick={()=>setHidePassword(false)}/> : <FaEye className='size-6 cursor-pointer' onClick={()=>setHidePassword(true)}/>
                }     
            </div>
            <div className='flex flex-row items-center'>
                <TextField label="confirm password" type={hideCnfPassword ? 'password' : 'text'} variant="standard" value={user.cnfPassword} onChange={(e)=>setUser({...user,cnfPassword:e.target.value})} sx={{m:2, my:1}}/>
                {
                  hideCnfPassword ? <FaEyeSlash className='size-6 cursor-pointer' onClick={()=>setHideCnfPassword(false)}/> : <FaEye className='size-6 cursor-pointer' onClick={()=>setHideCnfPassword(true)}/>
                }
            </div>
            <button type='submit' className='p-1 my-2 bg-sky-500 text-white hover:bg-sky-400 flex flex-row items-center justify-center'>
              {
                loading ? <ClockLoader className='size-4 text-white'/> : "Sign up"
              }
            </button>
        </form>
        <Link href="/login" className="font-medium text-blue-500 mt-2">Login Here!</Link>
    </div>
  )
}

export default Signup