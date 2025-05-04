import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUserThunk } from '../../store/slices/user.thunk'
import toast, { Toaster } from "react-hot-toast";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import LinearProgress from '@mui/material/LinearProgress';
import './ButtonLoader.css'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authCheck, buttonLoading } = useSelector(state => state.userReducer)
  const eyeRef = useRef(null)
  const eyeSlashRef = useRef(null)
  const inputRef = useRef(null)
  const [progress, setProgress] = useState(80)
  const [isprogress, setIsprogress] = useState(true)

  useEffect(() => {
    setProgress(100)
    setTimeout(() => {
      setIsprogress(false)
    }, 100)
  }, [])


  useEffect(() => {
    if (authCheck) {
      navigate('/chats')
    }
  }, [authCheck])

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    setIsprogress(true)
    setProgress(20)

    const response = await dispatch(loginUserThunk(loginData))
    setProgress(80)

    if (response?.payload?.success) {

      setProgress(100)

      setTimeout(() => {
        navigate('/chats')
        toast.success("Login Successfull!");
      }, 500);
    }

    setProgress(100)
    setTimeout(() => {
      setIsprogress(false)
    }, 500);
  }

  const handlePasswordClick = (e) => {
    if (e.target.closest('svg') === eyeRef.current) {
      eyeRef.current.className.baseVal = "hidden cursor-pointer"
      eyeSlashRef.current.className.baseVal = "visible cursor-pointer"
      inputRef.current.type = 'text'

    } else if (e.target.closest('svg') === eyeSlashRef.current) {
      eyeRef.current.className.baseVal = "visible cursor-pointer"
      eyeSlashRef.current.className.baseVal = "hidden cursor-pointer"
      inputRef.current.type = 'password'

    } else {
      eyeRef.current.className.baseVal = "visible cursor-pointer"
      eyeSlashRef.current.className.baseVal = "hidden cursor-pointer"
      inputRef.current.type = 'text'
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      {isprogress && <LinearProgress
        value={progress}
        variant='determinate'
        sx={{ height: '2px', background: '#848E9B', color: '#155DFC', position: 'absolute', top: '0px', left: '0px', right: '0px' }}
      />}

      <Toaster />

      <div className='flex flex-col justify-center items-center py-8 border border-[#464E58] rounded-md gap-6 w-[90%] sm:w-[90%] md:w-[60%] lg:w-[40%]'>

        <h2 className='text-center text-3xl font-bold mb-8'>Login Please !</h2>

        {/* username  */}
        <div className='w-[90%]'>
          <label className="input input-lg validator w-[100%]">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="input" required placeholder="Username" name='username' onChange={handleChange} autoComplete='name' />
          </label>
        </div>

        {/* password  */}
        <div className='w-[90%]'>
          <label className="input input-lg validator w-[100%]">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="password" required placeholder="Password" name='password' onChange={handleChange} ref={inputRef} />
            <div className='flex text-[#848E9B]' onClick={handlePasswordClick}>
              <IoEyeSharp className='visible cursor-pointer' ref={eyeRef} />
              <FaRegEyeSlash className='hidden cursor-pointer' ref={eyeSlashRef} />
            </div>
          </label>
        </div>


        {/* button  */}
        <div className='mt-6 w-[90%]'>
          <button onClick={handleLogin} className='flex justify-center items-center bg-blue-600 text-md font-semibold cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] p-2 w-[100%] rounded-sm text-lg'>
            {buttonLoading ? <div className='loader h-7 w-7'></div> : <p>Login</p>}
          </button>
        </div>

        <p>Don't have an account? &nbsp; <Link className='text-blue-500 underline' to={'/signup'}>SignUp</Link></p>

      </div>
    </div>
  )
}

export default Login
