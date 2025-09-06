import React from 'react'
import Image from './Image'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { format } from 'timeago.js'

const fetchPost = async () => {

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?sort=popular&limit=4`)

  return res.data

}


const FeaturedPosts = () => {

  const { isPending, error, data } = useQuery({

    queryKey: ['featuredPosts'],
    queryFn: () => fetchPost()

  })

  isPending && "Loading.....";

  error && "An error has occurred: " + error.message;

  const posts = data?.posts

  if( !posts || posts.length === 0 ) return "No featured posts available";

  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>

        {/* First  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Image  */}
            {
              posts[0]?.cover && <Image src={posts[0]?.cover} className="rounded-3xl object-cover" />
            }
            {/* <Image src="featured1.jpeg" className="rounded-3xl object-cover" /> */}
            {/* Details  */}
            <div className="flex items-center gap-4">
                <h2 className="font-semibold lg:text-lg">01.</h2>
                <Link className="text-blue-800 lg:text-lg">{posts[0]?.category}</Link>
                <span className="text-gray-500">{ format(posts[0].createdAt) }</span>
            </div>
            {/* Title  */}
            <Link to={`posts/${posts[0]?.slug}`} className='text-xl lg:text-3xl font-semibold lg:font-bold' >{posts[0]?.title}</Link>
        </div>

        {/* Other posts  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">

          {/* Second  */}
          <div className="h-1/3 flex justify-between gap-4">

            {/* Feature Image  */}
            { posts[1]?.cover && <Image src={posts[1]?.cover} className="rounded-3xl object-cover w-1/3 aspect-video" />}

            {/* Details  */}
            <div className="w-2/3">

              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                <h1 className="font-semibold">02.</h1>
                <Link className='text-blue-800'>{posts[1]?.category}</Link>
                <span className="text-gray-500 text-sm">{format(posts[1]?.createdAt)}</span>
              </div>

              {/* Title  */}
              <Link to={`posts/${posts[1]?.slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>{posts[1]?.title}</Link>

            </div>

          </div>

          {/* Third  */}
          <div className="h-1/3 flex justify-between gap-4">
            {/* Feature Image  */}
            { posts[2]?.cover && <Image src={posts[2]?.cover} className="rounded-3xl object-cover w-1/3 aspect-video" />}

            {/* Details  */}
            <div className="w-2/3">

              <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                <h1 className="font-semibold">03.</h1>
                <Link className='text-blue-800'>{posts[2]?.category}</Link>
                <span className="text-gray-500 text-sm">{format(posts[2]?.createdAt)}</span>
              </div>

              {/* Title  */}
              <Link to={`posts/${posts[2]?.slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>{posts[2]?.title}</Link>

            </div>
          </div>

          {/* Fourth  */}
          {
            posts.length < 4 ? null :
            <div className="h-1/3 flex justify-between gap-4">
              {/* Feature Image  */}
              { posts[3]?.cover && <Image src={posts[3]?.cover} className="rounded-3xl object-cover w-1/3 aspect-video" />}

              {/* Details  */}
              <div className="w-2/3">

                <div className="flex items-center gap-4 text-sm lg:text-base mb-4">

                  <h1 className="font-semibold">04.</h1>
                  <Link className='text-blue-800'>{posts[3]?.category}</Link>
                  <span className="text-gray-500 text-sm">{format(posts[3]?.createdAt)}</span>
                </div>

                {/* Title  */}
                <Link to={`posts/${posts[3]?.slug}`} className='text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium'>{posts[3]?.title}</Link>

              </div>
            </div>
          }

          </div>

    </div>
  )
}

export default FeaturedPosts