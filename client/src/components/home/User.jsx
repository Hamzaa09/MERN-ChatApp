import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUser } from '../../store/slices/user.slice'

const User = ({ oneUser, onclick }) => {
    const dispatch = useDispatch()
    const { selectedUserState } = useSelector(state => state.userReducer)
    const { onlineUsers } = useSelector(state => state.socketReducer)

    const handleUser = () => {
        dispatch(selectedUser(oneUser))
        onclick && onclick()
    }
    
    const isOnline = onlineUsers?.includes(oneUser?._id)

    return (
        <div onClick={handleUser} className={`cursor-pointer px-3 py-1 my-1 rounded-md hover:bg-[#353d46] transition-all ${selectedUserState?._id === oneUser?._id && 'bg-[#353d46]'}`}>
            <div className='flex items-center'>
                <div className={`avatar ${(isOnline)? 'avatar-online':'avatar-offline'} my-2`}>
                    <div className="w-12 rounded-full">
                        <img src={oneUser?.avatar} />
                    </div>
                </div>
                <div className='flex flex-col mx-3'>
                    <h5>{oneUser?.fullName}</h5>
                    <h6 className='text-[#ffffff96]'>{oneUser?.username}</h6>
                </div>
            </div>
        </div>
    )
}

export default User
