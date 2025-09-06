import React, { useState, useEffect } from 'react'
import Image from './Image'
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth
} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const [open, setOpen] = useState()

    const { getToken, isLoaded: authLoaded } = useAuth();

    useEffect(() => {
        if (!authLoaded) return; // wait until both are ready

        const fetchData = async () => {
        const token = await getToken();
        console.log("Token:", token);

        };

        fetchData();
    }, [authLoaded, getToken]);

  return (
    <div className='w-full h-16 md:h-20 flex items-center justify-between'>
        {/* Logo  */}
        <a href="/">
            <Image src="blg-brand.png" alt="logo" w="80" />
            {/* <img src="/logo.png" alt="LOGO" width="60" /> */}
        </a>
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
            <Link to="/">Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">Most Popular</Link>
            <Link to="/">About</Link>

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