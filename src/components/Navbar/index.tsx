'use client'

import React from 'react'

const Navbar = () => {
  
  return (
    <div className='p-2 flex flex-row items-center justify-between ' style={{backgroundColor:'#15F5BA'}}>
       <div className='flex flex-row items-center'>
        <img src='/images/logo.png' alt='logo' className='w-14 h-12'/>
        <h1 className='m-2 text-white font-semibold' >URLBite</h1>
       </div>
    </div>
  )
}

export default Navbar