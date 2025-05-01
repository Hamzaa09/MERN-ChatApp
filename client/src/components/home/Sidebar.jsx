import React, { useEffect, useState } from 'react'
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import User from './User';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserThunk } from '../../store/slices/user.thunk'
import toast from 'react-hot-toast';
import DataLoader from '../loaders/DataLoader';
import UserLoader2 from '../loaders/UserLoader';


const Sidebar = ({ onclick }) => {
    const dispatch = useDispatch()
    const { otherUsers, userProfile, buttonLoading, screenLoading } = useSelector(state => state.userReducer)

    const handleLogout = async () => {
        await dispatch(logoutUserThunk())
        toast.success("Logout Successfull!");
    }

    // search  
    const [searchValue, setsearchValue] = useState('')
    const [user, setUser] = useState([])

    useEffect(() => {
        if (searchValue) {
            setUser(otherUsers.filter((user) => (user.username.toLowerCase().includes(searchValue.toLowerCase()) || user.fullName.toLowerCase().includes(searchValue.toLowerCase()))))
        } else {
            setUser(otherUsers)
        }
    }, [searchValue, otherUsers])



    return (
        <div className='flex flex-col h-screen'>
            <h2 className='text-2xl font-semibold text-start pb-2 mt-7 px-5'>Chat Up!</h2>

            {/* header  */}
            <div className="px-5 pb-5 pt-3">
                <label className="w-[100%] input input-bordered flex items-center gap-2">
                    <input
                        onChange={(e) => (setsearchValue(e.target.value))}
                        type="text"
                        className="grow text-[18px] p-3"
                        placeholder="Search"
                    />
                    <IoSearch className='text-[18px]' />
                </label>
            </div>

            {/* users  */}
            <div className={`h-full ${screenLoading ? 'overflow-y-hidden' : 'overflow-y-auto'} px-5`}>
                {screenLoading ? <DataLoader /> : user?.map((oneUser) => (
                    < User key={oneUser._id} oneUser={oneUser} onclick={onclick} />
                )
                )}
            </div>

            {/* footer  */}
            <div className=' flex items-center justify-between pt-2 mb-4 px-5'>
                {screenLoading ? <UserLoader2 /> :
                    <Link to={`/profileupdate`}>
                        <div className="avatar flex items-center">
                            <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                                <img src={userProfile?.avatar} />
                            </div>

                            <h6 className='mx-4 font-bold text-xl'>{userProfile?.fullName}</h6>
                        </div>
                    </Link>
                }

                <div>
                    <button className='bg-blue-600 text-md font-semibold cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] px-4 py-2 rounded-sm text-lg' onClick={handleLogout}>
                        {buttonLoading ? <div className='loader  h-7 w-7 mx-4'></div> : <p>Logout</p>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
