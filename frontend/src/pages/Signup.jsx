import { useState } from "react"
import Button from "../components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const [username,setUsername] = useState("");
    const [password , setPassword] = useState("")
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

  return (
    <>
    <div className='flex flex-col items-center justify-center h-screen bg-blue-400'>
      <div className='w-full max-w-md p-6 bg-white border-2 border-gray-400 shadow-md rounded-lg'>  
        <h2 className='text-center text-2xl font-bold'>Sign Up</h2>
        <div className='mt-6'>
          <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
            Username
          </label>
          <div className='mt-1'>
            <input onChange={(e)=>{
                setUsername(e.target.value)
            }} type='username' id='username' className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' placeholder='username' />
          </div>
        </div>
        <div className='mt-6'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email address
          </label>
          <div className='mt-1'>
            <input onChange={(e) => {
                setEmail(e.target.value)
            }} type='email' id='email' className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' placeholder='Email address' />
          </div>
        </div>
        <div className='mt-6'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='mt-1'>
            <input onChange={(e)=>{
                setPassword(e.target.value)
            }} type='password' id='password' className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
          </div>
          </div>
          </div>
          <div className='mt-6'>
          <Button
    onClick={async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
                username,
                email,
                password
            });

            console.log("Signup Response:", response.data); // Debugging

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
                console.log("Token stored:", response.data.token); // Debugging
                navigate("/dashboard");
            } else {
                console.error("No token received:", response.data);
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
        }
    }}
    text={"Sign up"}
/>
            </div>
        </div>
    </>
  )
}

export default Signup