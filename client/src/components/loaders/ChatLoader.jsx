import React from 'react'
import './UserLoader.css'

const ChatLoader = () => {
    return (
        <>
            <div className='p-5 h-full overflow-y-auto'>
                <div className="chat chat-start">
                    <div className='max-w-25'>
                        <div className="chat-bubble w-25 bg-[#353d46] msgs relative"></div>
                    </div>
                </div>
            </div>

            <div className='p-5 h-full overflow-y-auto'>
                <div className="chat chat-end">
                    <div className='max-w-25'>
                        <div className="chat-bubble w-25 bg-[#353d46] msgs relative"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatLoader
