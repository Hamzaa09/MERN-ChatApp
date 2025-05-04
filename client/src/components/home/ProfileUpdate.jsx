import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserThunk } from '../../store/slices/user.thunk'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import LinearProgress from '@mui/material/LinearProgress';



const ProfileUpdate = () => {

    const { userProfile } = useSelector(state => state.userReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editUser, setEditUser] = useState({
        id: '',
        fullName: '',
        username: ''
    })
    const [progress, setProgress] = useState(80)
    const [isprogress, setIsprogress] = useState(true)

    useEffect(() => {
        setProgress(100)
        setTimeout(() => {
            setIsprogress(false)
        }, 100)
    }, [])

    useEffect(() => {
        if (!userProfile) return

        setEditUser({
            id: userProfile?._id,
            fullName: userProfile?.fullName,
            username: userProfile?.username
        })
    }, [userProfile])

    const handleChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setIsprogress(true)
        setProgress(20)

        const response = await dispatch(updateUserThunk(editUser))
        setProgress(80)

        if (response?.payload?.success) {

            setProgress(100)

            setTimeout(() => {
                navigate('/chats')
                toast.success("Profile Updated!");
            }, 500);
        }
    }

    const handleCancel = () => {
        setIsprogress(true)
        setProgress(100)

        navigate("/chats")
        setTimeout(() => {
            setIsprogress(false)
        }, 100)
    }

    return (
        <div className='relative'>
            {isprogress && <LinearProgress
                value={progress}
                variant='determinate'
                sx={{ height: '2px', background: '#848E9B', color: '#155DFC', position: 'absolute', top: '0px', left: '0px', right: '0px'}}
            />}
            <Toaster />
            <div className='flex justify-center items-center min-h-screen'>
                <div className='flex flex-col justify-center items-center py-8 border border-[#464E58] rounded-md gap-6 w-[90%] sm:w-[90%] md:w-[60%] lg:w-[40%]'>

                    {/* <div className=''>
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div> */}

                    <h2 className='text-center text-3xl font-bold mb-8'>Edit Profile</h2>


                    {/* fullname  */}
                    <div className='w-[90%]'>
                        <label className="input input-lg validator w-[100%]">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                            <input type="input" required placeholder="Full Name" pattern="^[A-Za-z]+(?:[' \-][A-Za-z]+)*$" minLength="3" maxLength="30" title="Only letters, hyphens, apostrophes, and spaces are allowed."
                                value={editUser.fullName} name='fullName' onChange={handleChange}
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />Only letters, hyphens, apostrophes, and spaces are allowed.
                        </p>
                    </div>

                    {/* username  */}
                    <div className='w-[90%]'>
                        <label className="input input-lg validator w-[100%]">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                            <input type="input" required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="Only letters, numbers or dash" value={editUser.username} name='username'
                                onChange={handleChange} />
                        </label>
                        <p className="validator-hint hidden">
                            Must be 3 to 30 characters
                            <br />containing only letters, numbers or dash
                        </p>
                    </div>


                    {/* button  */}
                    <div className='mt-5 w-[90%] flex gap-3 justify-center items-center'>
                        <button className='bg-transparent border border-[#848E9B] text-white text-md font-semibold cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] py-2 px-5 rounded-sm text-lg' onClick={handleCancel}>Cancel</button>

                        <button className='bg-blue-600 text-md font-semibold border border-blue-600 cursor-pointer hover:opacity-[0.9] active:translate-y-[1px] py-2 px-5 rounded-sm text-lg' onClick={handleSubmit}>Save</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileUpdate
