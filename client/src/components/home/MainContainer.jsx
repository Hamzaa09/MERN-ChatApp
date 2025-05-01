import React, { useEffect, useRef, useState } from 'react'
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getMsgThunk, sendMsgThunk } from '../../store/slices/message/message.thunk';
import { IoIosArrowBack } from "react-icons/io";
import ChatsLoader from '../loaders/ChatsLoader';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';


const MainContainer = ({ onBack }) => {
  const { selectedUserState, userProfile } = useSelector(state => state.userReducer)
  const { messages, msgLoading } = useSelector(state => state.messageReducer)
  const dispatch = useDispatch()

  const [emoji, setEmoji] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (selectedUserState?._id) {
      dispatch(getMsgThunk({ receiverId: selectedUserState?._id }))
    }
  }, [selectedUserState])


  const handleMsg = () => {
    dispatch(sendMsgThunk({ receiverId: selectedUserState?._id, message }))
    setMessage('')
  }

  // scroller for messages 

  const messageRef = useRef(null)

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  // time converter 
  const timeConverter = (msg) => {
    const time = msg.split('T')[1].split('.')[0]

    var hrs = parseInt(time.split(':')[0])
    var mins = time.split(':')[1]
    var day = time.split(':')[2]

    return `${hrs}:${mins}`
  }


  return (
    <>
      {selectedUserState ? (
        <div className='flex flex-col h-screen '>

          {/* header  */}
          <div className='w-full flex items-center justify-between pt-2 pb-5 mb-4 mt-5 px-5 border-1 border-[#1D232A] border-b-[#ffffff96]'>

            <IoIosArrowBack onClick={onBack} className='mr-4 text-2xl cursor-pointer md:hidden' />

            <div className="avatar flex flex-none items-center">
              <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                <img src={selectedUserState?.avatar} />
              </div>
            </div>

            <div className='flex flex-col grow justify-center items-start'>
              <h5 className='mx-4 text-xl font-bold'>{selectedUserState?.fullName}</h5>
              <h6 className='mx-4 text-[#ffffff96]'>{selectedUserState?.username}</h6>
            </div>
          </div>


          {/* conversation */}
          <div className={`relative p-5 h-full ${msgLoading ? 'overflow-y-hidden' : 'overflow-y-auto'}`} onClick={()=> setEmoji(false)}>
            {msgLoading ? <ChatsLoader /> : messages?.map((_, index) => (
              <div
                ref={messageRef}
                key={index}
                className={userProfile?._id === messages?.[index].senderId ? "chat chat-end" : "chat chat-start"}>

                <div className="chat-bubble">{messages?.[index].message}</div>
                <div className="chat-footer opacity-50">
                  <time className="text-xs opacity-50">{timeConverter(messages?.[index].createdAt)}</time>
                  {/* <p>Delivered</p> */}
                </div>
              </div>
            )
            )
            }
          </div>


          {/* info send Controllers  */}
          {emoji && <div className='absolute bottom-20 right-8 lg:right-20 md:right-10'><EmojiPicker onEmojiClick={(e)=> setMessage(message + e.emoji)} /></div> }
          <div className='flex gap-[3%] items-center justify-between pt-2 mb-4 px-5'>
            <div className='input input-lg text-lg w-full ml-3'>
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here" className="text-[18px]" />
              <MdOutlineEmojiEmotions className='text-2xl text-[#D8E4EA] cursor-pointer' onClick={() => setEmoji(!emoji)}/> 
            </div>

            <div className=''>
              <button onClick={handleMsg} className='bg-blue-600 text-md font-semibold cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] px-4 py-3.5 rounded-sm text-xl'><IoSendSharp />
              </button>
            </div>
          </div>
        </div >
      ) : (<>
        <div className='text-gray-300 h-[90vh] flex flex-col justify-center items-center'>

          <div>
            <h1 className="font-bold text-xl text-center mb-2">Wellcome to  Chat Up!</h1>
            <p className='text-lg'>Select the user from the left Sidebar to start Chat.</p>
          </div>

        </div>
      </>
      )}
    </>
  )
}

export default MainContainer
