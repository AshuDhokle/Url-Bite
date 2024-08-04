'use client'
import React from 'react'
import UrlInput from './UrlInput'
import Urls from './Urls'

import { useEffect,useState } from 'react';
import { IUrl } from '@/models/urlModel';
import axios from 'axios';
import toast from 'react-hot-toast';
const UrlsComponent = ({index,idx}:any) => {
  
  const [urlList,setUrlList] = useState<IUrl[]>([]);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
     const fetchUrls = async() =>{
      try {
        setLoading(true);
        const response = await axios.get('/api/user/getAllUserUrls')
        const data = await response.data
        console.log(data);
        
        if(response.data.success){
          setUrlList(response.data.urls);
        } 
      } catch (error:any) {
        toast.error(error.message)
        
      }finally{
        setLoading(false);
      }
     }
     fetchUrls();
    },[])

  return (
    <div role="tabpanel"
    className={`w-full flex flex-col items-center justify-center ${idx!==index ? 'hidden' : ''}`}
    >
      <UrlInput urlList = {urlList} setUrlList={setUrlList} />
      <Urls urlList = {urlList} loading={loading}/>
    </div>
  )
}

export default UrlsComponent