'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast,{Toaster} from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import MainDashboard from '@/components/Main'
const Dashboard = () => {

  return (
    <div>
      <Toaster/>
      <Navbar/>
      <MainDashboard/>
      
    </div>
  )
}

export default Dashboard