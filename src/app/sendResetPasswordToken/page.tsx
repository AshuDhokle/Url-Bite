'use client'
import { IUser } from '@/models/userModel';
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const SendResetPasswordToken = () => {
  const router = useRouter();
  const [user,setUser] = useState<IUser>();
  const [loggedIn,setLoggedIn] = useState(false);
  const [email,setEmail] = useState('');
  const [emailSent,setEmailSent] = useState(false);

//Still a problem 
//sending email twice

  const sendResetPasswordToken = async (email:string,e:any|null) =>{
    e?.preventDefault();
    try {
         const response = await axios.post('/api/user/sendResetPasswordToken',{email:email})
         const data = await response.data;
         if(data.success){
            toast.success('reset link sent successfully')
            setEmailSent(true);
        }
     }           
     catch(error:any) {
         toast.error(error.message);
     }
 }

  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const response = await axios.get('/api/user/getUserData');
            const data = await response.data;
            
            if(data.success){
                setUser(data.user);
                setLoggedIn(true);
            }
        } catch (error:any) {
            console.log(error.message);
        }
    }
    fetchUser();
  },[])
  
  useEffect(()=>{
    if(user){
       sendResetPasswordToken(user.email,null)
    } 
  },[user])

  return (
    <div>
        <nav className='w-full p-2 mb-2 bg-purple-500 text-white text-xl'>
            Reset Password  
        </nav>
        {
            emailSent ? (
                <div className='p-2 m-2 bg-lime-200 w-64'>
                    <h1>Email sent successfully to {loggedIn?user?.email : email}</h1>
                    <button onClick={()=>router.push('/login')}>Login</button>
                </div>
            )
           :
            (
             loggedIn ? (
                <div>
                <h1>Sending Email to {user?.email}</h1>
                </div>
             ) : (
               <form onSubmit={(e)=>sendResetPasswordToken(email,e)}
                    className='flex flex-col items-center justify-center'
                >
                <TextField label="email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)} sx={{m:2, my:1}}/>
                <button type='submit' className='m-2 p-1 px-4 bg-violet-400 hover:bg-violet-500 text-white' >Send Link</button>
               </form> 
             )
            )
        }

    </div>
  )
}

export default SendResetPasswordToken