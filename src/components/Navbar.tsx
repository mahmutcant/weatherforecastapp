import React from 'react'
import navbarIcon from "../assets/navbar-icon.svg";
const Navbar = () => {
  return (
    <div className='bg-[#296573] flex justify-center text-white py-6'>
        <div className='w-5/6 flex justify-between items-center'>
          <h1 className='text-[24px] font-bold font-sans'>Enos Weather Forecaster</h1>
          <img src={navbarIcon} alt="navbar-icon" className=''/>
        </div>
    </div>
  )
}

export default Navbar