import React, { useEffect, useRef } from 'react'

const Message = ({ msg, userProfile }) => {



    return (
        <div>
            <div className='p-5 h-full overflow-y-auto'>
                <div className={userProfile?._id === msg?.[0].senderId ? "chat chat-end" : "chat chat-start"}>

                    <div className='max-w-fit'>
                        <div className="chat-bubble w-full">{msg?.[0].message}</div>
                        <div className="chat-footer opacity-50 px-2 flex w-full justify-between">
                            <p>Delivered</p>
                            <time className="text-xs opacity-50">12:45</time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message
