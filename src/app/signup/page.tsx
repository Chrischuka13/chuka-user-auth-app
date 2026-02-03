"use client"
import Link from 'next/link'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'
import axios  from 'axios'
// import { MoonLoader } from 'react-spinners'


function SignupPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: ""
  })
  const [success, setSuccess] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    if (!user.username || !user.email || !user.password) {
      setError("please fill all necessary inputs")
      return
    }
    try {
      setLoading(true)
      setError("")
      const response = await axios.post("api/users/signup", user)
      console.log(response.data);
      setSuccess("Verification link sent to your email")
      router.push("/login")
      
    } catch (error :any) {
      console.log("sign up failed", error.message);
    }finally {
      setLoading(false)
    }
  }

  // if (loading) {
  //   return (
  //     <div className='fixed inset-0 backdrop-blur-xl flex items-center justify-center'>
  //       <MoonLoader color="#c11ce3" speedMultiplier={0.75}/>
  //     </div>
  //   )
  // }


  return (
    <form className='bg-purple-600 flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center justify-center p-16 text-2xl bg-white rounded-2xl'><h1 className='mb-8 font-bold text-4xl text-purple-700'>{loading? "Processing..." : "Sign Up"}</h1>
      <hr />
      <label htmlFor='username'>username</label>
      <input className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600' id='username' type="text" value={user.username} onChange={(event)=> setUser({...user, username: event.target.value})} placeholder='username'/>

      <label htmlFor='email'>email</label>
      <input className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600' id='email' type="text" value={user.email} onChange={(event)=> setUser({...user, email: event.target.value})} placeholder='email'/>
    
      <label htmlFor='password'>password</label>
      <input className='p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600' id='password' type="password" value={user.password} onChange={(event)=> setUser({...user, password: event.target.value})} placeholder='password'/>

      {success && <p className='text-[14px]' style={{color: "green"}}>{success}</p>}
      {error && <p className='text-[14px]' style={{color: "red"}}>{error}</p>}

      <button onClick={onSignup} className='p-2 bg-purple-600 rounded-lg mb-4 text-white hover:cursor-pointer hover:bg-purple-700 w-full mt-8'>{loading ? "Creating User..." : "SignUp"}</button>
      <Link href='login' className='text-[16px]'>visit login page</Link>
    </div>
    </form>
    
  )
}

export default SignupPage