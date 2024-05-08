"use client"
import React, { useState,useEffect } from 'react';

import { Isplaystore, MusicIdstore, currentPlayStore, playstore, trendingStore } from '@/app/data' ;
import Sunotags from '../compoments/suno';
import Udiotags from '../compoments/udio';



// const { currentPlayList, setCurrentPlay } = currentPlayStore();
// const { isPlaying, setIsPlaying } = Isplaystore();
// const { play, setplay } = playstore();
// const { musicId, setMusicId } = MusicIdstore();
// const handleplay = (item: number) => {
//   setplay(true);
//   if (musicId - 1 === item) {
//       setIsPlaying(false);
//   } else {
//       setIsPlaying(true)
//   }
//   setMusicId(item);
// }

export default function Popular() {
const [selectedPage, setSelectedPage] = useState('All');


  const handlePageChange = (pageName: string) => {
    setSelectedPage(pageName);
  };

  return (
    <div className="flex flex-col">
      <div className='mt-6 font-bold ml-4'><a href="/">Home {'>'} </a>Trending </div>
      <div className="flex mt-12 ml-10 text-3xl font-bold">Trending</div>
      <div className="mt-3 ml-12 flex w-[273px] bg-[#f2f2f2] rounded-lg h-[45px] ">
        {['All', 'AI Songs', 'Udio AI Songs'].map((pageName) => (
          <div
            key={pageName}
            className={`cursor-pointer mr-4 ${selectedPage === pageName ? 'font-sm' : ''}`}
            onClick={() => handlePageChange(pageName)}
          >
            <button className='focus:bg-[#FACC15] rounded-lg text-center h-full w-[80px]'>{pageName}</button>
          </div>
        ))}
      </div>
      <div className="mt-3 ml-12">
        {selectedPage === 'All' && <AllPageContent />}
        {selectedPage === 'AI Songs' && <AISongsPageContent />}
        {selectedPage === 'Udio AI Songs' && <UdioAISongsPageContent />}
      </div>
    </div>
  );
};
const AllPageContent: React.FC = () => {
  const { trendingList, setTrendingList} = trendingStore()
  useEffect(() => {
    async function fetchData() {
      const trending = await fetch('http://localhost:3000/api/trending');
          const trendingData = await trending.json();
          setTrendingList(trendingData.message);
    }
    fetchData();
  }, []); 
    
  return (
    <>
      <div className="flex mt-2 min-h-[50px] justify-center items-center">
        <div className='mx-4 min-w-[50px]'>#</div>
        <div className='mx-4 min-w-[200px]'></div>
        <div className='mx-4 min-w-[300px]'>Title</div>
        <div className='mx-4 min-w-[700px]'>Tags</div>
        <div className='mx-1 min-w-[100px]'>Duration</div>
      </div>
      <div className='' >
        {
        trendingList.map((item,index) => (

          <div key={index}  className="flex mt-2 hover:bg-[#d2caca] min-h-[100px] justify-center items-center ">
            <div className='mx-4 min-w-[50px]'>{item.id}</div>
            <div className='mx-4 min-w-[200px]'><img src={item.imgUrl} alt={item.title} className='w-[64px] h-[64px] rounded-lg' /></div>
            <div className='mx-4 min-w-[300px]'>{item.title}</div>
            <div className='mx-4 min-w-[700px]'><Sunotags/></div>
            <div className='mx-4 min-w-[100px]'>2.42</div>
          </div>
        ))}
      </div>
    </>
  );
};

const AISongsPageContent: React.FC = () => {
  const { trendingList, setTrendingList} = trendingStore()
  useEffect(() => {
    async function fetchData() {
      const trending = await fetch('http://localhost:3000/api/trending');
          const trendingData = await trending.json();
          setTrendingList(trendingData.message);
    }
    fetchData();
  }, []); 
  return (
    <>
      <div className="flex mt-2 min-h-[50px] justify-center items-center">
        <div className='mx-4 min-w-[50px]'>#</div>
        <div className='mx-4 min-w-[200px]'></div>
        <div className='mx-4 min-w-[300px]'>Title</div>
        <div className='mx-4 min-w-[700px]'>Tags</div>
        <div className='mx-1 min-w-[100px]'>Duration</div>
      </div>
      <div>
        {trendingList.map((item, index) => (
          <div key={index} className="flex mt-2 hover:bg-[#d2caca] min-h-[100px] justify-center items-center">
            <div className='mx-4 min-w-[50px]'>{item.id}</div>
            <div className='mx-4 min-w-[200px]'><img src={item.imgUrl} alt={item.title} className='w-[64px] h-[64px] rounded-lg' /></div>
            <div className='mx-4 min-w-[300px]'>{item.title}</div>
            <div className='mx-4 min-w-[700px]'><Sunotags/></div>
            <div className='mx-4 min-w-[100px]'>2.42</div>
          </div>
        ))}
      </div>
    </>
  );
};

const UdioAISongsPageContent: React.FC = () => {
  const { trendingList, setTrendingList} = trendingStore()
  useEffect(() => {
    async function fetchData() {
      const trending = await fetch('http://localhost:3000/api/trending');
          const trendingData = await trending.json();
          setTrendingList(trendingData.message);
    }
    fetchData();
  }, []); 
  return (
    <>
      <div className="flex mt-2 min-h-[50px] justify-center items-center">
        <div className='mx-4 min-w-[50px]'>#</div>
        <div className='mx-4 min-w-[200px]'></div>
        <div className='mx-4 min-w-[300px]'>Title</div>
        <div className='mx-4 min-w-[700px]'>Tags</div>
        <div className='mx-1 min-w-[100px]'>Duration</div>
      </div>
      <div>
        {trendingList.map((item, index) => (
          <div key={index} className="flex mt-2 hover:bg-[#d2caca] min-h-[100px] justify-center items-center">
            <div className='mx-4 min-w-[50px]'>{item.id}</div>
            <div className='mx-4 min-w-[200px]'><img src={item.imgUrl} alt={item.title} className='w-[64px] h-[64px] rounded-lg' /></div>
            <div className='mx-4 min-w-[300px]'>{item.title}</div>
            <div className='mx-4 min-w-[700px]'><Udiotags/></div>
            <div className='mx-4 min-w-[100px]'>2.42</div>
          </div>
        ))}
      </div>
    </>
  );
};

