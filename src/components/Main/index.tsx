'use client'

import { Tabs,Tab} from '@mui/material'
import React, { useState } from 'react'
import UrlsComponent from './urlComponent/UrlsComponent'
import Profile from './Profile/Profile'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const MainDashboard = () => {

    const [index,setIndex] = useState(0);
    const changeIndex = (e:any,newValue:number) =>{
      setIndex(newValue)
    }
    const router = useRouter();
  
  const handleLogout = async() =>{
    try {
      const response = await axios.post('/api/user/logout');
      const data = await response.data;

      if(data.success){
        toast.success(data.message);
        router.push('/login')
      }
    } catch (error:any) {
      toast.error(error.message)
    }
  }
return (
    <div className='w-full flex flex-row' style={{height:'720px'}}>
      <div className='flex flex-col '>
      <Tabs
        orientation="vertical"
        value={index}
        onChange={changeIndex}
        sx={{ backgroundColor:'#26355D', width:'250px',height:'100%' }}
      >
        <Tab label='Dashboard' sx={{fontWeight:600,color:'white'}}/>
        <Tab label='Profile' sx={{fontWeight:600,color:'white'}} />
      </Tabs>
      <button onClick={handleLogout}
        className='text-white p-2'
        style={{backgroundColor:'#26355D'}}
      >
        Logout
      </button>
      </div>
      <UrlsComponent idx={0} index={index}/>
      <Profile idx={1} index={index}/>
    </div>
  )
}

export default MainDashboard