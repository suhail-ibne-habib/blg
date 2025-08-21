import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'


const FeaturedPosts = () => {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>

        {/* First  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Image  */}
            <Image src="featured1.jpeg" className="rounded-3xl object-cover" />
            {/* Details  */}
            <div className="flex items-center gap-4">
                <h2 className="font-semibold lg:text-lg">01.</h2>
                <Link className="text-blue-800 lg:text-lg">Web Design</Link>
                <span className="text-gray-500">2 days ago</span>
            </div>
            {/* Title  */}
            <Link to="test" className='text-xl lg:text-3xl font-semibold lg:font-bold' >Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
        </div>

        {/* Other posts  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">

          {/* Second  */}
          <div className="h-1/3 flex justify-between gap-4">

            {/* Feature Image  */}
            <Image src="./featured2.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video" />

            {/* Details  */}
            <div className="w-2/3">

              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                <h1 className="font-semibold">02.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className="text-gray-500 text-sm">2 days ago</span>
              </div>

              {/* Title  */}
              <Link to="test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Link>

            </div>

          </div>

          {/* Third  */}
          <div className="h-1/3 flex justify-between gap-4">
            {/* Feature Image  */}
            <Image src="./featured3.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video" />

            {/* Details  */}
            <div className="w-2/3">

              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                <h1 className="font-semibold">03.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className="text-gray-500 text-sm">3 days ago</span>
              </div>

              {/* Title  */}
              <Link to="test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Link>

            </div>
          </div>

          {/* Fourth  */}
          <div className="h-1/3 flex justify-between gap-4">
            {/* Feature Image  */}
            <Image src="./featured4.jpeg" className="rounded-3xl object-cover w-1/3 aspect-video" />

            {/* Details  */}
            <div className="w-2/3">

              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                <h1 className="font-semibold">04.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className="text-gray-500 text-sm">4 days ago</span>
              </div>

              {/* Title  */}
              <Link to="test" className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Link>

            </div>
          </div>

        </div>

    </div>
  )
}

export default FeaturedPosts