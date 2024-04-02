// ""use client"
// import React, {useState, useEffect} from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import demoImage from '@/public/img/demo_profile.png'
// import {AiOutlineClose} from 'react-icons/ai'
// import { usePathname } from 'next/navigation'
// import {signOut, useSession} from 'next-auth/react'

// const Navbar = () => {
//     const [userData, setUserData] = useState({})
//     const {data: session, status} = useSession();

//     const pathname = usePathname();

//     const [showDropdown, setShowDropdown] = useState(false)

//     async function fetchUser() {
//         try {
//             const res = await fetch(`http://localhost:3000/api/user/${session?.user?._id}`);

//             const resData = await res.json();

//             setUserData(resData)
//         } catch(error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         fetchUser();
//     },[session?.user?._id])

//     const handleShowDropdown = () => setShowDropdown(prev => true)
//     const handleHideDropdown = () => setShowDropdown(prev => false)
//   return (
//     <div className='container py-2 h-16 flex items-center justify-between'>
//         <Link href="/">
//             <h2>
//                 Infinity<span className='special-word'> Insights.</span>
//             </h2>
//         </Link>

//         <ul className='flex items-center gap-3'>
//         <li>
//                 <Link href="/" className={ pathname === '/' ? "text-primaryColor font-bold" : ""}>Home</Link>
//             </li>

//             <li>
//                 <Link href="/blog" className={ pathname === '/blog' ? "text-primaryColor font-bold" : ""}>Blogs</Link>
//             </li>

//             {
//                 session?.user ? (
//                     <>
//                         <li>
//                             <Link href="/create-blog"  className={ pathname === '/create-blog' ? "text-primaryColor font-bold" : ""}>Create</Link>
//                         </li>
//                         <li>
//                             <div className='relative'>
//                                 <Image 
//                                     onClick={handleShowDropdown}
//                                     src={userData?.avatar?.url ? userData?.avatar?.url : demoImage}
//                                     alt='avatar'
//                                     width={0}
//                                     height={0}
//                                     sizes='100vw'
//                                     className='w-10 h-10 rounded-full cursor-pointer'
//                                 />

//                                 {showDropdown && (
//                                     <div className='absolute top-0 right-0 bg-primaryColorLight p-5'>
//                                         <AiOutlineClose onClick={handleHideDropdown} className='w-full cursor-pointer' />
//                                         <button onClick={() => {signOut(); handleHideDropdown();}}>Logout</button>
//                                         <Link onClick={handleHideDropdown} href={`/user/${session?.user?._id.toString()}`}>Profile</Link>
//                                     </div>
//                                 )}
//                             </div>
//                         </li>
//                     </>
//                 ) : (
//                     <>
//                         <li>
//                             <Link href="/login"  className={ pathname === '/login' ? "text-primaryColor font-bold" : ""}>Log In</Link>
//                         </li>
//                         <li>
//                             <Link href="/signup"  className={ pathname === '/signup' ? "text-primaryColor font-bold" : ""}>Sign Up</Link>
//                         </li>
//                     </>
//                 )
//             }


//         </ul>
//     </div>
//   )
// }

// export default Navbar

"use client"
import React, { useState, useEffect } from 'react';
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
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State to track navbar visibility

    async function fetchUser() {
        try {
            const res = await fetch(`http://localhost:3000/api/user/${session?.user?._id}`);
            const resData = await res.json();
            setUserData(resData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [session?.user?._id]);

    const handleShowDropdown = () => setShowDropdown(prev => true);
    const handleHideDropdown = () => setShowDropdown(prev => false);
    const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen); // Function to toggle navbar visibility

    return (
        <nav className=" dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/">
                    <h2 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Infinity<span className='special-word'> Insights.</span>
                    </h2>
                </Link>
                <button onClick={toggleNavbar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    {isNavbarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                </button>
                <div className={` w-full md:block md:w-auto ${isNavbarOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  md:flex-row md:space-x-8">
                        <li>
                            <Link href="/">
                                <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/' ? "text-primaryColor font-bold" : ""}`}>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog">
                                <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/blog' ? "text-primaryColor font-bold" : ""}`}>Blogs</span>
                            </Link>
                        </li>
                        {/* Additional links and logic for user session handling */}
                        {session?.user ? (
                            <>
                                <li>
                                    <Link href="/create-blog">
                                        <span className={`block py-2 px-3 hover:text-primaryColor ${pathname === '/create-blog' ? "text-primaryColor font-bold" : ""}`}>Create</span>
                                    </Link>
                                </li>
                                <li>
                                    <div className='relative'>
                                        <Image 
                                            onClick={handleShowDropdown}
                                            src={userData?.avatar?.url ? userData?.avatar?.url : demoImage}
                                            alt='avatar'
                                            width={0}
                                            height={0}
                                            sizes='100vw'
                                            className='w-10 h-10 rounded-full cursor-pointer'
                                        />

                                        {showDropdown && (
                                            <div className='absolute top-0 right-0 bg-primaryColorLight p-5'>
                                                <AiOutlineClose onClick={handleHideDropdown} className='w-full cursor-pointer' />
                                                <button onClick={() => {signOut(); handleHideDropdown();}}>Logout</button>
                                                <Link href={`/user/${session?.user?._id.toString()}`}>
                                                    <span onClick={handleHideDropdown}>Profile</span>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login">
                                        <span className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${pathname === '/login' ? "text-blue-700 bg-white" : ""}`}>Log In</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <span className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${pathname === '/signup' ? "text-blue-700 bg-white" : ""}`}>Sign Up</span>
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
