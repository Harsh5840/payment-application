import Button from "../components/Button"

const Signin = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-md p-6 bg-white border-2 border-gray-400 shadow-md rounded-lg'>
        <h2 className='text-center text-2xl font-bold'>Sign In</h2>
        <div className='mt-6'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email address
          </label>
          <div className='mt-1'>
            <input type='email' id='email' className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' placeholder='Email address' />
          </div>
        </div>

        <div className='mt-6'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <div className='mt-1'>
            <input type='password' id='password' className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' />
          </div>
        </div>

        <div className='mt-6'>
          <Button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'/>
        </div>
      </div>

    </div>
  )
}

export default Signin