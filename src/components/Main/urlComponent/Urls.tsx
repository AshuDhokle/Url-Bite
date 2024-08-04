import React from 'react'
import { IUrl } from '@/models/urlModel';
import { ClockLoader } from 'react-spinners';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
interface UrlsProps {
    urlList: IUrl[];
    loading:boolean;
}

const Urls: React.FC<UrlsProps> = ({urlList,loading}) => {
    
  const redirectToOriginalUrl = async (shortUrl:string,urlId:any)=>{
    try {
      const response = await axios.get('/api/url/retriveUrl',{params:{shortUrl}});
      const data = await response.data
      if(data.success){
        toast.success(data.message);
        if (!/^https?:\/\//i.test(data.url)) {
          data.url = 'http://' + data.url;
        }
        window.open(data.url, '_blank');
        await updateClickCount(urlId) 
      }
    } catch (error : any) {
      toast.error(error.message);
    }
  }  

  const updateClickCount = async(urlId:any)=>{
    try {
      
      const response = await axios.put('/api/url/updateUrlClickCount',{urlId:urlId});
      const data = await response.data; 
           
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className='p-4 w-full flex felx-col items-center justify-center'>
        <Toaster/>
        {
          loading && <ClockLoader/>
        }
        {
          urlList.length > 0 && 
        <ul className='p-2 w-full flex flex-col items-center justify-center' style={{backgroundColor:'#1A2130'}}>
        {
         urlList.map((url:IUrl,idx:number)=>(
          <li key={idx} className='w-full flex flex-row justify-between border-b-2' style={{color:'#F7E7DC'}}>
             <h1 className='m-2' >{url.originalUrl}</h1>
             <h1 className='m-2 cursor-pointer' onClick={()=>redirectToOriginalUrl(url.shortUrl,url?._id)} >{url.shortUrl}</h1>
             <h1 className='m-2'>{url.clickCount}</h1>
           </li>
         ))
        }
        </ul> 
        } 
      </div>
  )
}

export default Urls