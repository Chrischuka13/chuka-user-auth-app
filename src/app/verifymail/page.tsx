'use client';
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function verifymail() {
  const [token, setToken] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  const verifyUserEmail = async () => {
    try {
        await axios.post('api/users/verifymail', {token})
        setIsVerified(true)
    } catch (error :any) {
        setError(error.messaage)
        console.log(error.response.data);
    }
  }
  
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  //useeffect is a hook that runs the first time a page loads;
  //  if there is a manipulation in the token it would still run
  useEffect(() => {
    if (token.length > 0) {
        verifyUserEmail()
    }
  }, [token]); // anychange in the token would run this code


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>{token ? `${token}` : "no token"}</h2>

        {isVerified && (
            <div>
                <h2 className='text-2xl mb-8'>Email verified</h2>
                <Link href="/login" className='p-2 bg-purple-600 rounded-lg mb-4 text-white hover:cursor-pointer hover:bg-purple-700'>Login</Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className='text-2xl bg-red-700 text-black'>Error</h2>
            </div>
        )}
    </div>
  )
}
