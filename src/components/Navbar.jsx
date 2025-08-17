import React, { useState } from 'react'
import Image from './Image'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [open, setOpen] = useState()

  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        {/* Logo  */}
        <div>
            {/* <Image src="logo.png" alt="logo" w="32" /> */}
            <img src="/logo.png" alt="LOGO" width="60" />
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden">
            <div className="cursor-pointer"
                onClick={ () => setOpen( prev => !prev ) }
            >
                {
                    open ? "X" : "="
                }
            </div>

            {/* MOBILE LINK LIST  */}
            <div className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 font-medium text-lg gap-8 bg-color-[#e6e6ff] transition-all ease-in-out ${ open ? '-right-0' : '-right-[100%]'}`}>
                <a href="">Home</a>
                <a href="">Trending</a>
                <a href="">Most Popular</a>
                <a href="">About</a>
                <SignedOut>
                    <Link to='login'>
                        <button className='py-2 px-4 rounded-3xl bg-blue-700 text-white'>Login</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <a href="">Home</a>
            <a href="">Trending</a>
            <a href="">Most Popular</a>
            <a href="">About</a>
            
            <SignedOut>
                <Link to='login'>
                    <button className='py-2 px-4 rounded-3xl bg-blue-700 text-white'>Login</button>
                </Link>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>

        </div>
    </div>
  )
}

export default Navbar