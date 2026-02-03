"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
// import { MoonLoader } from 'react-spinners'
import { useEffect } from 'react'

function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })
  const [success, setSuccess] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const onLogin = async () => {
    if (!user.email || !user.password) {
      setError("email and password are required")
      return
    }
    try {
      setLoading(true)
      setError("")
      const response = await axios.post("api/users/login", user)
      console.log("log in successfully", response.data);
      setSuccess("login successuffy")
      if (!response) {
        throw new Error("something went wrong")
      }
      router.push("/profile")

    } catch (error :any) {
      console.log("Login Failed", error.message);
      setError("email or password not correct")
      setUser({email: "", password: ""})
      // toast.error(error.message)
    }finally {
      setLoading(false)
    }

  }

  // if (loading) {
  //   return(
  //     <div className='fixed inset-0 backdrop-blur-xl flex items-center justify-center'>
  //       <MoonLoader color="#c11ce3" speedMultiplier={0.75}/>
  //     </div>
  //   )
  // }

  return (
    <div className='bg-purple-600 flex justify-center items-center min-h-screen '>
      <div className='flex flex-col items-center justify-center p-16 text-2xl bg-white rounded-2xl'><h1 className='mb-8 font-bold text-4xl text-purple-700'>{loading? "processing...":"Login"}</h1>
      
      <label htmlFor='email'>email</label>
      <input className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-purple-600' id='email' type="text" value={user.email} onChange={(event)=> setUser({...user, email: event.target.value})} placeholder='email'/>
    
      <label htmlFor='password'>password</label>
      <input className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-purple-600' id='password' type="password" value={user.password} onChange={(event)=> setUser({...user, password: event.target.value})} placeholder='password'/>

      {success && <p className='text-[14px]' style={{color: "green"}}>{success}</p>}
      {error && <p className='text-[14px]' style={{color: "red"}}>{error}</p>}

      <button onClick={onLogin} className='p-2 bg-purple-600 rounded-lg mt-4 text-white hover:cursor-pointer hover:bg-purple-700 w-full'>{loading? "Logging...": "Log in"}</button>
      <Link href='/signup' className='text-[16px] mt-4'>Visit sign up page</Link>
      
      <Link href='/forgotpassword' className='text-[16px] p-2 rounded border border-purple-600 mt-8 hover:cursor-pointer hover:bg-purple-600 hover:text-white'>forgot password?</Link>
      
    </div>
    </div>
    
    
    
  )
}

export default LoginPage