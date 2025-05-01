import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MainContainer from './MainContainer'
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket, setOnlineUsers } from '../../store/slices/socket/socket.slice';
import { setNewMessage } from '../../store/slices/message/message.slice';
import { Toaster } from 'react-hot-toast';


const Home = () => {
  const { authCheck, userProfile } = useSelector(state => state.userReducer)
  const { socket } = useSelector(state => state.socketReducer)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)


  useEffect(() => {
    if (!authCheck) return;
    dispatch(initializeSocket(userProfile?._id))
  }, [authCheck])

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers))
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    });

    return () => {
      socket.close()
    }
  }, [socket])

  return (
    <>
      <Toaster />
      <div className='flex w-screen h-screen overflow-x-hidden relative'>
        <div className= {show? 'absolute left-[100%] top-0 w-[100vw] md:w-[40%] md:relative md:left-[0%] md:top-0': 'absolute left-[0%] top-0 w-[100vw] md:w-[40%] md:relative md:left-[0%] md:top-0'}>
          <Sidebar onclick={() => setShow(true)} />
        </div>
        <div className={!show? 'absolute left-[100%] top-0 w-[100vw] md:w-[full] md:relative md:left-[0%] md:top-0': 'absolute left-[0%] top-0 w-[100vw] md:w-[full] md:relative md:left-[0%] md:top-0'}>
          <MainContainer onBack={() => setShow(false)}/>
        </div>
      </div>
    </>
  )
}

export default Home
