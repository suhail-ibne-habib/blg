import React from 'react'
import Image from './Image'
import { Link, Links } from 'react-router-dom'

const SinglePost = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
        {/* Image  */}
        <div className="md:hidden xl:block xl:w-1/3">
            <Image src="postImg.jpeg" className="rounded-2xl object-cover" />
        </div>

        {/* details & Title */}
        <div className="flex flex-col gap-4 xl:w-2/3">
            <Link to="test" className='text-4xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written By</span>
                <Link className='text-blue-800'>John Doe</Link>
                <span>on</span>
                <Link className='text-blue-800'>Web Design</Link>
                <span>2 days ago</span>
            </div>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur doloribus at recusandae officia optio. Eveniet voluptatem dolore odio, delectus veritatis quas aperiam eum sed sit incidunt, quia, in possimus qui.</p>

            <Link to="/test" className='underline text-blue-800 text-sm'>Read More</Link>

        </div>
    </div>
  )
}

export default SinglePost