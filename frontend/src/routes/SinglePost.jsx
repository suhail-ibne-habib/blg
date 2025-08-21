import React from 'react'
import { Link } from 'react-router-dom'

import Image from '../components/Image'
import PostMenuActions from '../components/PostMenuActions'
import Search from '../components/Search'
import Comments from '../components/Comments'

function SinglePost() {
  return (
    <div className="flex flex-col gap-8">

      {/* Details  */}
      <div className="flex gap-8">

        <div className="lg:w-3/4 flex flex-col gap-8">
          <h1 className='text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold' >Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>Written by</span>
              <Link className='text-blue-800'>John Doe</Link>
              <span>on</span>
              <Link className='text-blue-800'>Web Design</Link>
              <span>2 days ago</span>
          </div>

          <p className='text-gray-500 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iure commodi veniam in vero quis illum dolores, ducimus facilis neque placeat esse minus, unde ut fugiat. Dicta incidunt expedita repellendus?</p>

        </div>

        <div className="hidden lg:block w-2/5">

          <Image src="postImg.jpeg" className="rounded-2xl"/>

        </div>

      </div>

      {/* Content  */}

      <div className="flex flex-col md:flex-row gap-8">

          <div className="lg:text-lg flex flex-col gap-6 text-justify">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aspernatur nostrum sint! Commodi ducimus aspernatur quisquam veniam debitis enim voluptatibus quod, sunt iste magnam veritatis beatae esse accusamus voluptatum reiciendis.</p>
          </div>

          {/* Menu  */}

          <div className="px-4 h-max sticky top-8">
            <h1 className="mb-4 text-sm font-medium">Author</h1>

            <div className="flex flex-col gap-4">

              <div className="flex items-center gap-8">

                <Image src="userImg.jpeg" className="w-12 h-12 rounded-full object-cover" w="48" h="48" />

                <Link className='text-blue-800'>John Doe</Link>


              </div>
              
              <p className='text-sm gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam iste ipsam</p>

              <div className="flex flex-gap-2">

                <Link>
                  <Image src="facebook.svg"/>
                </Link>

                <Link>
                  <Image src="instagram.svg" />
                </Link>
                
              </div>

            </div>



            <h1 className="mt-8 mb-4 text-sm font-medium">Actions</h1>

            <PostMenuActions />

            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>

            <div className="flex flex-col gap-2 text-sm">
              <Link className='underline'>All</Link>
              <Link className='underline' to="/">Web Design</Link>
              <Link className='underline' to="/">Development</Link>
              <Link className='underline' to="/">Database</Link>
              <Link className='underline' to="/">Search Engine</Link>
              <Link className='underline' to="/">Marketing</Link>
            </div>

            <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>

            <Search />

          </div>

      </div>

      <Comments />

    </div>
  )
}

export default SinglePost