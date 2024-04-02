"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import demoImage from '@/public/img/demo_profile.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const [userData, setUserData] = useState({});
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const navbarRef = useRef(null);

    async function fetchUser() {
        try {
            const res = await fetch(`https://infinity-insights.vercel.app/api/user/${session?.user?._id}`);
            const resData = await res.json();
            setUserData(resData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [session?.user?._id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsNavbarOpen(false);
                setShowDropdown(false); // Close the dropdown when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowDropdown = () => setShowDropdown(true);
    const handleHideDropdown = () => setShowDropdown(false);
    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
        setShowDropdown(false); // Close the dropdown when a nav link is clicked
    };

    return (
        <nav className="dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" ref={navbarRef}>
                <Link href="/">
                    <h2 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Infinity<span className='special-word'> Insights.</span>
                    </h2>
                </Link>
                <button onClick={toggleNavbar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    {isNavbarOpen ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
                </button>
                <div className={`w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8">
                        <li>
                            <Link href="/">
                                <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/' ? "text-primaryColor font-bold" : ""}`} onClick={handleNavLinkClick}>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog">
                                <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/blog' ? "text-primaryColor font-bold" : ""}`} onClick={handleNavLinkClick}>Blogs</span>
                            </Link>
                        </li>
                        {session?.user ? (
                            <>
                                <li>
                                    <Link href="/create-blog">
                                        <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/create-blog' ? "text-primaryColor font-bold" : ""}`} onClick={handleNavLinkClick}>Create</span>
                                    </Link>
                                </li>
                                <li>
                                    <div className='relative ml-4'>
                                        <Image
                                            onClick={handleShowDropdown}
                                            src={ userData?.avatar?.url || demoImage}
                                            alt='avatar'
                                            width={0}
                                            height={0}
                                            sizes='100vw'
                                            className='w-10 h-10 rounded-full cursor-pointer'
                                        />

                                        {showDropdown && (
                                              <div className='absolute -top-12 left-16 md:left-0 md:top-14 md:right-0 ml-2 md:-ml-40 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20'>
                                              <div className="py-2 ">
                                                  <button onClick={handleHideDropdown} className="absolute top-0 right-0 mr-2 mt-2  text-gray-400 hover:text-primaryColor focus:outline-none">
                                                      <AiOutlineClose/>
                                                  </button>
                                                  <button onClick={() => { signOut(); handleHideDropdown(); }} className="block w-full text-left px-4 py-2 mt-5 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-500 hover:text-primaryColor">Logout</button>
                                                  <Link href={`/user/${session?.user?._id.toString()}`}>
                                                      <span onClick={handleHideDropdown} className="block w-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-500 hover:text-primaryColor ">Profile</span>
                                                  </Link>
                                              </div>
                                          </div>
                                        )}
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login">
                                        <span className={`block  py-2 px-3 hover:text-primaryColor ${pathname === '/login' ? "text-primaryColor" : ""}`} onClick={handleNavLinkClick}>Log In</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/signup' ? "text-primaryColor" : ""}`} onClick={handleNavLinkClick}>Sign Up</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
