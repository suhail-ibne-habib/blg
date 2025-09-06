import React from 'react'
import SinglePost from './SinglePost'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

const fetchPosts = async (pageParam, searchParams) => {

  const searchParamsObj = Object.fromEntries([...searchParams]);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: {
      page: pageParam,
      limit: 5,
      ...searchParamsObj
    }
  })
  return res.data
}

const PostList = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.hasMore ? pages.length + 1 : undefined,
  })

  if( isFetching ) return "Loading.....";

  if( error ) return "An error has occurred: " + error.message;

  console.log(data)

  const allPosts = data?.pages.flatMap(page => page?.posts) || [];

  return (
    
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage} 
      hasMore={!!hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="flex flex-col gap-12 mb-8"
      
    >

      {allPosts.map(post => (
          <SinglePost key={post?.id} post={post} />
      ))}

  </InfiniteScroll>

  )
}

export default PostList