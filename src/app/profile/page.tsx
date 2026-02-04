"use client"
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProfilePage = () => {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success('logout successfully')
      router.push('login')

    } catch (error :unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(errorMessage);
      toast.error(errorMessage)
    }
  }
  
  // const getUserDetails = async () => {
  //   const response = await axios.get('/api/users/me')
  //   console.log(response.data);
  //   setData(response.data.data.email) 
  // }

  useEffect(() => {
  async function getUser() {
  const res = await fetch("/api/users/me");
  const data = await res.json();
  setData(data.data.email);
  }
  getUser();
}, []);
 
  return (
    <div className='bg-purple-600 flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center justify-center p-16 text-2xl bg-white rounded-2xl'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className='p-2 rounded bg-green-400'>{data === 'nothing'? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button  className='mt-4 p-2 bg-orange-400 rounded-lg mb-4 text-white hover:cursor-pointer hover:bg-orange-800'>Get User details</button>
        <button onClick={logout} className='mt-4 p-2 bg-purple-600 rounded-lg mb-4 text-white hover:cursor-pointer hover:bg-purple-700'>Logout</button>
    </div>
    </div>
    
  )
}

export default ProfilePage