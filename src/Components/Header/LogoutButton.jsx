import React from 'react'
import { useDispatch } from 'react-redux' 
import authService from "../../AppWrite/Auth"
import {logout} from "../../Store/AuthSlice"

function LogoutButton() {
  const dispatch = useDispatch()
  const logoutHandler=()=>{authService.logOut().then(()=>{
       dispatch(logout())
  })}  
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
    onClick={logoutHandler}>Logout</button>              // here
  )
}

export default LogoutButton