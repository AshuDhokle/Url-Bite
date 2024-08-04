import React,{useState} from 'react'
import Modal from '@mui/material/Modal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TextField } from '@mui/material';
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const CancleSubscriptionModel : React.FC<any>= ({user}) => {
    const [open, setOpen] = React.useState(false);
    const [password,setPassword] = useState('');
    const [hidePassword,setHidePassword] = useState(true);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleCancelSubscription = async(e:any) =>{
        e.preventDefault();
        try {
          if(password.length>0){    
          const response = await axios.post('/api/user/cancelSubscription',{password});
          const data = await response.data;
    
          if(data.success){
            toast.success('Subscription Cancled')
          }
          }
          else{
            toast.error('Please enter the password')
          }
        } catch (error : any) {
          toast.error(error.message)
        }
      }
  return (
    <>
    {
        user.subscriptionId !== 'none' && 
            <button onClick={handleOpen}
             className='w-52 rounded-md p-2 mt-10 m-2 border-2 border-red-300 hover:bg-red-500 hover:text-white hover:border-0' 
             >
              Cancel Subscription
            </button>
    }
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='rounded-md w-fit p-4 absolute top-1/3 left-1/3 ' style={{backgroundColor:'#fff'}}>
            <h1 className='mb-2 text-2xl font-sans font-bold text-red-600'>Confirm Cancellation</h1>
            <div className=' p-2' style={{backgroundColor:'#fff'}}>
                <h1 className='text-xl font-semibold my-2' style={{color:'#399918'}}> Subscription Details </h1>
                <h2 className='text-lg '>Plan Type : <span className=' font-bold' style={{color:'#399918'}}>{user.plan}</span></h2>
                <h2 className='text-lg '>Number of urls left : <span className=' font-bold' style={{color:'#399918'}}>{user.count}</span> </h2>
                <p className='text-sm font-medium '>The total count left after canceling the subsctiption is <span className='text-red-600 font-bold'> {user.count<50 ? 0 : 50} </span></p> 
            </div>
        <form onSubmit={handleCancelSubscription}
         className='flex flex-col items-center justify-center'
        >
         <h1 className='mt-6 text-xl font-bold text-red-500'>Enter your password to confirm</h1>    
         <div className='flex flex-row items-center justify-center'>    
          <TextField label="password" variant="standard" type={hidePassword ? 'password' : 'text'} autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} sx={{m:2, mb:1}}/>   
          { hidePassword ? <FaEyeSlash className='mt-4 size-6 cursor-pointer' onClick={ () => setHidePassword(false)}/> : <FaEye className='mt-4 size-6 cursor-pointer' onClick={ () => setHidePassword(true)}/> }
         </div>
         <button type='submit' className='mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600' >Cancel Subscription</button>    
        </form>
        </div>
      </Modal>
    </>
  )
}

export default CancleSubscriptionModel