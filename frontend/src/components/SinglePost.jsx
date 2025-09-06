import React from 'react'
import Image from './Image'
import { Link, Links } from 'react-router-dom'
import {format} from 'timeago.js'

const SinglePost = ({post}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
        {/* Image  */}
        <div className="md:hidden xl:block xl:w-1/3">
            <Image src={post.cover} className="rounded-2xl object-cover w-full max-h-[300px]" />
        </div>

        {/* details & Title */}
        <div className="flex flex-col gap-4 xl:w-2/3">
            <Link to={`/posts/${post.slug}`} className='text-4xl font-semibold'>{post.title}</Link>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>Written By</span>
                <Link className='text-blue-800'>{post.author.username}</Link>
                <span>on</span>
                <Link className='text-blue-800'>{post.category}</Link>
                <span>{format(post.createdAt)}</span>
            </div>

            <p>{post.desc}</p>

            <Link to={`/posts/${post.slug}`} className='underline text-blue-800 text-sm'>Read More</Link>

        </div>
    </div>
  )
}

export default SinglePost