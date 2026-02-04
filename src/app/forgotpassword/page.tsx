"use client"
import axios from 'axios'
import React from 'react'
import { MoonLoader } from 'react-spinners'

const Forgotpassword = () => {
    const [user, setUser] = React.useState({
        email: ""
    })
    const [success, setSuccess] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const forgotUserPassword = async () => {
        if (!user.email) {
            setError("email is required")
            return
        }
        try {
            setError("")
            setLoading(true)
            const response = await axios.post('api/users/forgotpassword', user)
            console.log(response.data);
            setUser({email: ""})
            setSuccess("reset password link sent successfully")
        } catch (error :any) {
            console.log(error.message);
            setError("forgot password failed") 
        }finally {
            setLoading(false)
        }
    }

     if (loading) {
        return(
          <div className='fixed inset-0 backdrop-blur-xl flex items-center justify-center'>
            <p className='flex justify-center items-center'>do not exit page while loading...</p>
            <MoonLoader color="#c11ce3" speedMultiplier={0.75} />
            
          </div>
        )
      }

  return (
    <div className='bg-purple-600 flex justify-center items-center min-h-screen '>
        <div className='flex flex-col items-center justify-center p-16 text-2xl bg-white rounded-2xl'>
            <label htmlFor="email" className='mb-4 text-center font-semibold'>Input your Email Address</label>
            <input type="text" id='email' className='p-2 rounded-lg border border-purple-600 focus:border-gray-600 mb-4' placeholder='email' value={user.email} onChange={(event) => setUser({...user, email: event.target.value})}/>

            {error && <p className='text-[14px]' style={{color: "red"}}>{error}</p>}
            {success && <p className='text-[14px]' style={{color: "green"}}>{success}</p>}

            <button onClick={forgotUserPassword} className='p-2 bg-purple-600 rounded-lg text-white hover:cursor-pointer hover:bg-purple-700 mt-4'>Submit</button>
        </div>
    </div>
    
  )
}

export default Forgotpassword