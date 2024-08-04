'use client'
import { IUrl } from '@/models/urlModel';
import axios from 'axios';
import React,{useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';import { ClockLoader } from 'react-spinners';

interface UrlsProps{
  urlList : IUrl[],
  setUrlList:React.Dispatch<React.SetStateAction<IUrl[]>>;
}

const UrlInput :  React.FC<UrlsProps> = ({urlList,setUrlList}) => {
    const [url,setUrl] = useState('');
    
    const handleSubmit = async(e:any) => {
      e.preventDefault();
      try {
        const response = await axios.post('/api/url/shortenUrl',{originalUrl:url});
        const data = await response.data;
        if(data.success){
          addUrlToUser(data);
        }
        setUrl('')
      } catch (error:any) {
        toast.error(error.message)
      } 
    }

    const addUrlToUser = async(data:any)=>{
      try {
        const response2 = await axios.put('/api/user/addUrlToUser',{url:data.url})
        const data2 = await response2.data;
        if(data2.success){
          toast.success('short Url generated');
          setUrlList((urlList)=>[...urlList,data.url])
        }
      } catch (error:any) {
        toast.error(error.message)
      }
    }
    
    return (
      <form className='w-full flex flex-col md:flex-row items-center justify-center' onSubmit={handleSubmit}>
        <Toaster/>
        <input type='text' placeholder='input url here' value={url} 
        onChange={(e:any)=>setUrl(e.target.value)}
        className='p-2 w-60 lg:w-3/4 rounded-xl outline-none border-2 border-gray-400'
        />
        <button type='submit' className='m-2 w-28 p-2 text-white rounded-md' style={{backgroundColor:'#211951'}}>Bite</button>
      </form>
    
  )
}

export default UrlInput