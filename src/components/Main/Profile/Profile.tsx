'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { ClockLoader } from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from '../../ForgotPassword';
import { plans } from '@/app/utils/plans';
import Card from './card';
import CancleSubscriptionModel from './CancleSubscriptionModel';
const Profile = ({idx,index}:any) => {
  const [loading,setLoading] = useState(false);
  const [user,setUser] : any = useState();

  useEffect(()=>{
    const fetchUserDetails = async() =>{
     try {
      setLoading(true);
      const response = await axios.get('/api/user/getUserData');
      const data = await response.data;
      if(data.success){
        setUser(data.user);
      }
      }catch (error:any) {
        toast.error(error.message)
      }finally{
        setLoading(false);
      }
    }
    fetchUserDetails();
  },[])


  return (
    <div role="tabpanel"
    className={`w-full flex flex-col  ${idx!==index ? 'hidden' : ''}`}
    >
      <Toaster/>
      {
        loading && <ClockLoader/> 
      }
      {
        user &&  (
          <div className='p-2 w-full flex flex-col'>
          <div className='m-10 p-4 bg-emerald-100 text-green-700 text-xl'>
            <h1 className='text-xl'><span className='text-black font-semibold'>Username : </span>{user?.username}</h1>
            <h1 className='text-xl'><span className='text-black font-semibold'>Email : </span>{user?.email}</h1>
            <div className='flex flex-row items-center'>
            <h1 className='text-xl mr-2'><span className='text-black font-semibold'>Plan : </span>{user?.plan}</h1>
            <h1 className='text-xl mr-2'><span className='text-black font-semibold'>Urls remaining : </span>{user?.count}</h1>
            </div>
          </div>
          <ForgotPassword/>
          <div className={`grid grid-col-1 md:grid-cols-2 items-center justify-center`}>
          {
            plans.map((plan,idx)=>(
             user.plan !== plan.type && <Card key={idx} plan ={plan} user = {user}/>
            ))
          }
          </div>
          <CancleSubscriptionModel user={user}/>
          </div>
        )
      }
    </div>
  )
}

export default Profile