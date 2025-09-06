import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();

      if (location.pathname !== '/posts') {
        // navigate to posts page with search param
        navigate(`/posts?search=${query}`);
      } else {
        // if already on posts page, update search params
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      }
    }
  };

  return (
    
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox='0 0 24 24'
            width="20"
            height="20"
            fill="none"
            stroke="gray"
        >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>

        <input type="text" name="" placeholder='search a post...' id="" className='bg-transparent' onKeyPress={handleKeyPress} />
    </div>
    
  )
}

export default Search