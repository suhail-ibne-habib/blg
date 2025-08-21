import React, { useState } from 'react'
import PostList from '../components/PostList'
import { SideMenu } from '../components/SideMenu'

function Archive() {

  const [ open, setOpen ] = useState( false )

  return (
    <div className="">
      <h1 className="mb-8 text-2xl">Development Blog</h1>

      <button
        onClick={()=> setOpen( prev => !prev)}
        className='bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl mb-4 md:hidden cursor-pointer'
      >
          { open ? "Close" : "Filter or Search" }
      </button>

      <div className="flex gap-8 flex flex-col-reverse gap-8 md:flex-row">

        <div className="">
          <PostList />
        </div>

        <div className={`${open ? 'block' : "hidden"} md:block`}>
          <SideMenu />
        </div>

      </div>
    </div>
  )
}

export default Archive