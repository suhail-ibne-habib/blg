import React from 'react'
import { Link } from 'react-router-dom'
import MainCats from '../components/MainCats'
import FeaturedPosts from '../components/FeaturedPosts'

function Home() {
  return (
    <div className="mt-4 flex flex-col gap-4">
        {/* BREADCRUMB */}
        <div className="flex gap-4 items-center">
          <Link to="/home">Home</Link>
          <span>-</span>
          <span className="text-blue-800">Blogs and Articles</span>
        </div>
        {/* INTRODUCTION */}
        <div className="flex items-center justify-between">
            {/* title */}

            <div className="flex flex-col gap-4">
                <h1 className="text-gray-800 text-2xl md:text-5xl lg:text-6xl font-bold">
                 Voices Unfold
                </h1>
                <p className="text-md md:text-xl">Dive into articles, thoughts, and stories written by students to connect, inspire, <br></br>and spark new conversations.</p>
            </div>


            {/* animated button  */}

            <Link to="\write" className='relative hidden md:block'>
              
              <svg
                viewBox='0 0 200 200'
                width="200"
                height="200"
                className='text-lg tracking-widest animate-spin animated-btn'
              >

                <path
                  id="circlePath"
                  d="M 100, 100 m -75, 0 a 75, 75 0 1, 1 150, 0 a 75, 75 0 1, 1 -150, 0"
                  fill="none"
                />
                  
                <text>
                  <textPath href="#circlePath" startOffset="0%">Write your story -</textPath>
                  <textPath href="#circlePath" startOffset="50%">Share your ideas -</textPath>
                </text>

              </svg>

              <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="52" height="52" x="0" y="0" viewBox="0 0 24 24">
                    <g>
                      <path fill="#ffffff" d="m16.004 9.414-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2z" opacity="1" data-original="#000000" class=""></path>
                    </g>
                  </svg>
              </button>

            </Link>

        </div>
        {/* Main Categories */}
        <MainCats />
        {/* FEATURED POSTS */}
        <FeaturedPosts />
        {/* POST LIST  */}
    </div>
  )
}

export default Home