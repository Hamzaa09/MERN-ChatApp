import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsersThunk, getUserThunk } from './store/slices/user.thunk'


const App = () => {
  const dispatch = useDispatch()
  const { authCheck } = useSelector(state => state.userReducer)

  useEffect(() => {
    if (authCheck) {
      dispatch(getUserThunk())
      dispatch(getOtherUsersThunk())
    }
  }, [authCheck])


  return (
    <>
    </>
  )
}

export default App
