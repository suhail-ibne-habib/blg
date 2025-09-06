import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

const MainCats = () => {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
        <div className='flex-1 flex items-center justify-between flex-wrap'>
          <Link to="/posts" className='bg-blue-800 text-white rounded-full px-4 py-2'>All Posts</Link>
          <Link to="/posts?cat=web-design" className='hover:bg-blue-800 hover:text-white rounded-full px-4 py-2'>Web Design</Link>
          <Link to="/posts?cat=development" className='hover:bg-blue-800 hover:text-white rounded-full px-4 py-2'>Development</Link>
          <Link to="/posts?database" className='hover:bg-blue-800 hover:text-white rounded-full px-4 py-2'>Databases</Link>
          <Link to="/posts?cat=seo" className='hover:bg-blue-800 hover:text-white rounded-full px-4 py-2'>Search Engine</Link>
          <Link to="/posts?marketing" className='hover:bg-blue-800 hover:text-white rounded-full px-4 py-2'>Marketing</Link>
        </div>

        {/* search */}
        <div>
            <Search />
        </div>
    </div>
  )
}

export default MainCats