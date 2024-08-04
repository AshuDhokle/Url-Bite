'use client'

import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ClockLoader } from 'react-spinners'
import { useAppDispatch } from '@/lib/store/hooks'
import { login } from '@/lib/store/features/user/userSlice'
import ForgotPassword from '@/components/ForgotPassword'

const Login = () => {
    const router = useRouter(); 
    const dispatch = useAppDispatch();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const [hidePassword,setHidePassword] = useState(true);
    const [loading,setLoading] = useState(false); 

    const handleLogin = async(e:any)=>{
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post('/api/user/login',{username,password}); 
        const data = await response.data;

        if(data.success){
          toast.success(data.message);
          dispatch(login(data.user));
          router.push('/dashboard');
        }else{
          toast.error(data.message);
        }

      } catch (error :any ) {
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <Toaster/>
      <h1 className='text-xl font-semibold text-blue-500' >Login</h1>
      <form onSubmit={handleLogin} className='p-4 flex flex-col shadow-lg'>
      <TextField label="username" variant="standard" value={username} onChange={(e)=>setUsername(e.target.value)} sx={{m:2, mb:1}}/>
      <div className='flex flex-row items-center'>
      <TextField label="password" variant="standard" type={hidePassword ? 'password' : 'text'} value={password} onChange={(e)=>setPassword(e.target.value)} sx={{m:2, mb:1}}/>
      { hidePassword ? <FaEyeSlash className='size-6 cursor-pointer' onClick={ () => setHidePassword(false)}/> : <FaEye className='size-6 cursor-pointer' onClick={ () => setHidePassword(true)}/> }
      </div>
      <button type='submit' className='p-1 my-2 bg-sky-500 text-white mt-2 hover:bg-sky-400 flex flex-row items-center justify-center'>
      {
        loading ? <ClockLoader className='size-4 text-white'/> : "Login"
      }
      </button>
      </form>
      <ForgotPassword />
      <Link href="/signup" className="font-medium text-blue-500 mt-2">Signup Here!</Link>
    </div>
  )
}

export default Login