'use clinet'
import React from 'react'
import Link from 'next/link'
const ForgotPassword = () => {
  return (
    <div>
      <button  
        className='m-2 text-blue-400'
      >  
      <Link href={'/sendResetPasswordToken'}>
        Reset Password?
      </Link>
      </button>
    </div>
  )
}

export default ForgotPassword