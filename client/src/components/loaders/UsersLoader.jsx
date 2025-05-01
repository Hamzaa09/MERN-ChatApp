import React from 'react'
import './UserLoader.css'

const UserLoader = () => {
  return (
    <div className="px-3 py-1 my-1 rounded-md transition-all">
      <div className='flex items-center'>
        <div className="avatar my-2">
          <div className="w-12 rounded-full bg-[#353d46] pic relative overflow-hidden">
          </div>
        </div>
        <div className='flex flex-col gap-2 mx-3'>
          <h5 className='bg-[#353d46] rounded-lg h-3 w-50 heading relative overflow-hidden'></h5>
          <h5 className='bg-[#353d46] rounded-lg h-3 w-30 heading relative overflow-hidden'></h5>
        </div>
      </div>
    </div>
  )
}

export default UserLoader
