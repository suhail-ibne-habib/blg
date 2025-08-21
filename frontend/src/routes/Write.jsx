import { useUser } from '@clerk/clerk-react'
import React from 'react'
import 'react-quill-new/dist/quill.snow.css'
import ReactQuill from 'react-quill-new'

function Write() {

  const { isLoaded, isSignedIn } = useUser()

  if( !isLoaded ){
    return <div>Loading....</div>
  }

  if( isLoaded && !isSignedIn){
    return <div>Available for only logged in user...</div>
  }

  return (
    <div className="h-[calc(100vh - 65px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">

      <h1 className='text-xl font-light'>Create a New Post</h1>

      <form action="" className='flex flex-col gap-6 flex-1 mb-6'>
        <button className='w-max p-2 shadow-md rouned-xl text-sm text-gray-500 bg-white'>Add a cover iamge</button>

        <input type="text" className='text-4xl font-semibold bg-transparent outline-none' placeholder="My Awesome Story" name="" id="" />

        <div className="flex items-center gap-4">

          <label htmlFor="" className='text-sm'>Choose a category: </label>

          <select name="" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="default">Default</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="search-engines">Search Enginges</option>
            <option value="marketing">Marketing</option>
          </select>

        </div>

        <textarea name="" className='p-4 rounded-xl bg-white shadow-md' placeholder='A Short Description' id=""></textarea>

        <ReactQuill className='flex-1 rounded-xl bg-white shadow-md' theme="snow" />

        <button className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-4 w-36'>Submit</button>

      </form>

    </div>
  )
}

export default Write