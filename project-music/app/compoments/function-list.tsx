'use client'
import { RiMusicFill } from "react-icons/ri";
import { FaFire } from "react-icons/fa";
import { IoLogoRss } from "react-icons/io";
import { RiRadioLine } from "react-icons/ri";
import { MdQueueMusic } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'



export default function FunctionList() {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        router.push('/discover');
    }, []);
    return (
        <div className="flex   divide-x divide-gray-500 ">
            {/* 左侧分栏 */}
            <nav className=" text-black w-[300px] p-4 h-screen">
                <div className="ml-2 py-3">
                    <h1 className=" font-semi text-sm mb-4">Music</h1>
                    <ul>
                        <li className="py-4 flex items-center">
                            <div className="pr-2 "><RiMusicFill /></div>
                            <Link href="/discover" className="hover:text-[#FACC15] font-medium text-sm">
                            {pathname === '/discover' && (<span></span>)}Discover
                                </Link>
                        </li>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><FaFire /></div>
                            <Link href="/Trending" className="hover:text-[#FACC15] font-medium text-sm">
                            {pathname === '/Trending' && (<span></span>)}Trending
                                </Link>
                        </li>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><IoLogoRss /></div>
                            <Link href="/Newest" className="hover:text-[#FACC15] font-medium text-sm">
                            {pathname === '/Newest' && (<span></span>)}Newest
                            
                                </Link>
                        </li>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><RiRadioLine /></div>
                            <Link href="/Roaming" className="hover:text-[#FACC15] font-medium text-sm">
                            {pathname === '/Roaming' && (<span></span>)}Roaming
                                </Link>
                        </li>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><MdQueueMusic /></div>
                            <Link href="/Playlists" className="hover:text-[#FACC15] font-medium text-sm">
                            {pathname === '/Playlists' && (<span></span>)}Playlists
                                </Link>
                        </li>
                    </ul>
                </div>
                <div className="ml-2 py-3">
                    <h1 className="text-xl font-bold mb-4">Library</h1>
                    <ul>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><FaHeart /></div>
                            <Link href="">
                                <span className="hover:text-[#FACC15] font-medium text-sm">Favorites</span></Link>
                        </li>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><FaPlayCircle /></div>
                            <Link href="">
                                <span className="hover:text-[#FACC15] font-medium text-sm">Recently</span></Link>
                        </li>
                    </ul>
                </div>
                <div className="ml-2 py-3">
                    <h1 className="text-xl font-bold mb-4">Tools</h1>
                    <ul>
                        <li className="py-4 flex items-center">
                            <div className="pr-2"><FaCirclePlay /></div>
                            <Link href="">
                                <span className="hover:text-[#FACC15] font-medium text-sm">Create Music</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* 右侧分栏 */}
            <div></div>
        </div>




    )
}