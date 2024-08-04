'use client'
import React,{useEffect, useState} from 'react'
import { TextField } from '@mui/material';
import { FaEyeSlash } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
const ResetPassword = () => {
    const router = useRouter();
    const [password,setPassword] = useState('');
    const [cnfPassword,setCnfPassword] = useState('');
    const [hidePassword,setHidePassword] = useState(true);
    const [hideCnfPassword,setHideCnfPassword] = useState(true);
    const [token,setToken] = useState('');

    const resetPassword = async(e:any)=>{
        e.preventDefault()
        try {
           if(token.length>0){
               const response = await axios.post('/api/user/resetpassword',{token:token,password:password})
               const data = await response.data;
               if(data.success){
                toast.success('Password reset Successfully');
                router.push('/login')
               }
           }        
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
       const tokenUrl = window.location.search.split('=')[1]
       console.log(tokenUrl);
       
       setToken(tokenUrl);
    },[])
    
    return (
    <div>
        <nav className='w-full p-2 mb-2 bg-purple-500 text-white text-xl'>
            Reset Password  
        </nav>
        <div className='w-full flex flex-col items-center justify-center'>
        <form onSubmit={(e)=>resetPassword(e)}
            className='w-fit p-4 flex flex-col items-center justify-center shadow-xl'
        >
            <div className='flex flex-row items-center'>
                <TextField label="password" type={hidePassword ? 'password' : 'text'} variant="standard" value={password} onChange={(e)=>setPassword(e.target.value)} sx={{m:2, my:1}}/>
                {
                  hidePassword ? <FaEyeSlash className='size-6 cursor-pointer' onClick={()=>setHidePassword(false)}/> : <FaEye className='size-6 cursor-pointer' onClick={()=>setHidePassword(true)}/>
                }     
            </div>
            <div className='flex flex-row items-center'>
                <TextField label="confirm password" type={hideCnfPassword ? 'password' : 'text'} variant="standard" value={cnfPassword} onChange={(e)=>setCnfPassword(e.target.value)} sx={{m:2, my:1}}/>
                {
                  hideCnfPassword ? <FaEyeSlash className='size-6 cursor-pointer' onClick={()=>setHideCnfPassword(false)}/> : <FaEye className='size-6 cursor-pointer' onClick={()=>setHideCnfPassword(true)}/>
                }
            </div>
            <button type='submit'
                className='m-2 p-1 px-4 rounded-md bg-violet-500 hover:bg-violet-600 text-white'
            >
                Reset
            </button>
        </form>
        </div>
    </div>
  )
}

export default ResetPassword