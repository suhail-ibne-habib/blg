import React from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'

export const SideMenu = () => {

    const [ searchParams, setSearchParams ] = useSearchParams()

    const handleFilterChange = (e) => {

        if( searchParams.get("sort") === e.target.value ) return;
        
        setSearchParams({ ...Object.fromEntries([...searchParams]), sort: e.target.value })
        
    }

    const handleCategoryChange = (category) => {

        if( searchParams.get("cat") === category ) return;

        if( category === "posts" ) {
            const paramsObj = Object.fromEntries([...searchParams])
            delete paramsObj.cat
            return setSearchParams({ ...paramsObj })
        }

        setSearchParams({ ...Object.fromEntries([...searchParams]), cat: category })

    }

  return (
    <div className="px-4 h-max sticky top-8">

        <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
        <Search />
        <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>

        <div className="flex flex-col gap-2 text-sm">
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">

                <input type="radio" name="sort" onChange={handleFilterChange} id="" value="newest" className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer bg-white rounded-sm checked:bg-blue-800'/>
                Newest

            </label>
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">

                <input type="radio" name="sort" onChange={handleFilterChange} id="" value="popular" className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer bg-white rounded-sm checked:bg-blue-800'/>
                Popular

            </label>
            
            <label htmlFor="" className="flex items-center gap-2 cursor-pointer">

                <input type="radio" name="sort" onChange={handleFilterChange} id="" value="oldest" className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer bg-white rounded-sm checked:bg-blue-800'/>
                Oldest

            </label>
        </div>

        <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>

        <div className="flex flex-col gap-2 text-sm">
            {/* <Link className="underline" to="/posts">All</Link>
            <Link className="underline" to="/posts?cat=web-design">Web Design</Link>
            <Link className="underline" to="/posts?cat=development">Development</Link>
            <Link className="underline" to="/posts?cat=databases">Databases</Link>
            <Link className="underline" to="/posts?cat=seo">Search Engines</Link>
            <Link className="underline" to="/posts?cat=marketing">Marketing</Link> */}

            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("posts")}>All</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("web-design")}>Web Design</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("development")}>Development</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("databases")}>Databases</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("seo")}>Search Engines</span>
            <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("marketing")}>Marketing</span>
        </div>

    </div>
  )
}
