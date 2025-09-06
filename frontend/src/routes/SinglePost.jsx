import React from 'react'
import { Link, useParams } from 'react-router-dom'

import Image from '../components/Image'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import Comments from '../components/Comments'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'timeago.js'
import DOMPurify from 'dompurify'

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
  return res.data
};

function SinglePost() {

  const slug = useParams().slug;

  const {isPending, error, data} = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug)
  });

  if( isPending ) return "Loading.....";

  if( error ) return "An error has occurred: " + error.message;

  if( !data ) return "Post not found";

  return (
    <div className="flex flex-col gap-8">

      {/* Details  */}
      <div className="flex flex-col-reverse gap-8">

        <div className="w-full flex flex-col gap-8">
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold' >{data.title}</h1>

          <p className='text-gray-500 font-medium'>{data.desc}</p>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Written by</span>
              <Link className='text-blue-800'>{data.author.username}</Link>
              <span>on</span>
              <Link className='text-blue-800'>{data.category}</Link>
              <span> {format(data.createdAt)}</span>
              <span>Visits: {data.visits}</span>
          </div>


        </div>

        <div className="hidden lg:block w-full">

          {
            data.cover && <Image src={data.cover} className="rounded-2xl w-full h-[400px] object-cover object-center"/>
          }

        </div>

      </div>

      {/* Content  */}

      <div className="flex flex-col md:flex-row gap-8">

          <div className="lg:text-lg flex flex-col gap-6 text-justify" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }}></div>

          {/* Menu  */}

          <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium">Author</h1>

            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-8">

                {
                  data.author.img === "" ? <Image src="userImg.jpeg" className="w-12 h-12 rounded-full object-cover" w="48" h="48" /> :
                  <img src={data.author.img} className="w-12 h-12 rounded-full object-cover" w="48" h="48" />
                }

                <Link className='text-blue-800'>{data.author.username}</Link>


              </div>
              
              <p className='text-sm gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iste ipsam</p>

              {/* <div className="flex flex-gap-2">

                <Link>
                  <Image src="facebook.svg"/>
                </Link>

                <Link>
                  <Image src="instagram.svg" />
                </Link>
                
              </div> */}

            </div>



            <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

            <PostMenuActions post={data} />

            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>

            <div className="flex flex-col gap-2 text-sm">
              <Link className="underline" to="/posts">All</Link>
              <Link className="underline" to="/posts?cat=web-design">Web Design</Link>
              <Link className="underline" to="/posts?cat=development">Development</Link>
              <Link className="underline" to="/posts?cat=databases">Databases</Link>
              <Link className="underline" to="/posts?cat=seo">Search Engines</Link>
              <Link className="underline" to="/posts?cat=marketing">Marketing</Link>
            </div>

            <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>

            <Search />

          </div>

      </div>

      <Comments postId={data._id} />

    </div>
  )
}

export default SinglePost