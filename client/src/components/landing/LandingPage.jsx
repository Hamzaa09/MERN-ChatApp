import React, { useEffect, useRef } from 'react'
import { GoArrowRight } from "react-icons/go";
import './LandingPage.css'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const btnRef = useRef(null)

  const handleEnter = (e) => {
    btnRef.current.style.transform = 'translate(6px)';
    btnRef.current.style.transition = 'transform 0.3s';
  }

  const handleLeave = (e) => {
    btnRef.current.style = 'translate -2px'
  }

  return (
    <div className='parent w-[100vw] h-[100vh]  px-[5vw] select-none overflow-auto lg:overflow-hidden'>

      {/* navigation bar */}
      <nav className='h-[10vh] flex items-center justify-between'>
        <h1 className='font-bold text-2xl tracking-wider'>Chat Up!</h1>
        <ul className='flex gap-3 md:gap-5 text-lg'>
          <li className='font-semibold cursor-pointer p-2 hover:underline active:translate-y-[1px]'> <Link to={'/login'}> Login </Link> </li>
          <li className='bg-blue-600 content-center px-3 font-bold text-[#1D232A] rounded-4xl cursor-pointer active:translate-y-[1px]'><Link to={'/signup'}> Sign Up </Link></li>
        </ul>
      </nav>

      {/* hero section  */}
      <main className='main w-[100%] lg:h-[90%] flex justify-center items-center'>

        <div className='div-one w-[60%] flex flex-col gap-12'>

          <h1 className='h1 text-5xl font-bold line-2 leading-15 tracking-wider mb-5'>Let's Connect With The <span className='text-blue-600'>World..!</span></h1>
          <p className='w-[70%] text-lg'>We let you connect globally with others <b className='italic'>without having any Google Account</b> or <b className='italic'>Mobile Number</b>.</p>

          <button onMouseEnter={handleEnter} onMouseLeave={handleLeave} className='w-[fit-content] text-white mt-5 flex items-center gap-2 bg-blue-600 text-md font-bold cursor-pointer active:translate-y-[1px] px-4 py-3 rounded-sm text-lg'><Link to={'/signup'}> Get Started </Link><GoArrowRight ref={btnRef}/></button>
        </div>

        <div className='w-[40%] h-[38vh] div-two container bg-[url(/poster.png)] bg-contain bg-center bg-no-repeat lg:scale-140'>
        </div>

      </main>
      
    </div>
  )
}

export default LandingPage
