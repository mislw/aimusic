"use client"
import { FaFire } from "react-icons/fa6";
import { playstore, Isplaystore, MusicIdstore, newestListStore, roamingListStore, trendingStore, currentPlayStore } from '@/app/data';
import { useEffect } from "react";

export default function Discover() {
    const { newestData, setNewestData } = newestListStore()
    const { roamingList, setRoamingList } = roamingListStore()
    const { trendingList, setTrendingList } = trendingStore()
    const { play, setplay } = playstore();
    const { isPlaying, setIsPlaying } = Isplaystore();
    const { musicId, setMusicId } = MusicIdstore();
    const handleplay = (item: number) => {
        setplay(true);
        if (musicId - 1 === item) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true)
        }
        setMusicId(item);
    }

    useEffect(() => {
        async function fetchData() {
            const newest = await fetch('http://localhost:3000/api/newest');
            const newestData = await newest.json();
            setNewestData(newestData.message);
            const roaming = await fetch('http://localhost:3000/api/roaming');
            const roamingData = await roaming.json();
            setRoamingList(roamingData.message);
            const trending = await fetch('http://localhost:3000/api/trending');
            const trendingData = await trending.json();
            setTrendingList(trendingData.message);
        }
        fetchData();
    }, []);

    const { currentPlayList, setCurrentPlay } = currentPlayStore();
    return (
        <div className="ml-[200px] mr-[70px]">
            <div className="mt-7">
                <h1 className="font-bold text-2xl ml-3">Discover</h1>
                <div>
                    <span className="flex items-center mt-6 ml-3">
                        <FaFire className="" />
                        <p className="font-bold text-xl ml-2">Trending</p>
                    </span>
                    <div className="pt-8 w-[90%] h-[180px]  flex flex-nowrap overflow-hidden hover:overflow-x-auto" onClick={() => { setCurrentPlay(trendingList) }}>
                        {
                            trendingList.map((item, index) => (
                                <div className="ml-3" key={item.id} onClick={() => handleplay(index)}>
                                    <img width={110} height={110} alt="" src={item.imgUrl} className="rounded-lg" />
                                    <span className="inline-block w-[112px] h-6 overflow-hidden truncate text-[14px] p-1">{item.title}</span>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div>
                    <span className="flex items-center mt-6 ml-3">
                        <FaFire className="" />
                        <p className="font-bold text-xl ml-2">Newest</p>
                    </span>
                    <div className="pt-8 w-[90%] h-[180px] flex flex-nowrap hover:overflow-x-auto overflow-hidden" onClick={() => { setCurrentPlay(newestData) }}>
                        {
                            newestData.map((item, index) => (
                                <div className="ml-3" key={item.id} onClick={() => handleplay(index)}>
                                    <img src={item.imgUrl} alt="111" className="rounded-lg" width={110} height={110} />
                                    <span className="inline-block w-[112px] h-6 overflow-hidden truncate text-[14px] p-1">{item.title}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="pb-[120px]">
                    <span className="flex items-center mt-6 ml-3">
                        <FaFire className="" />
                        <p className="font-bold text-xl ml-2">Roaming</p>
                    </span>
                    <div className="pt-8 w-[90%] h-[180px] flex flex-nowrap hover:overflow-x-auto overflow-hidden" onClick={() => { setCurrentPlay(roamingList) }}>
                        {
                            roamingList.map((item, index) => (
                                <div className="ml-3" key={item.id} onClick={() => handleplay(index)}>
                                    <img src={item.imgUrl} alt="111" className="rounded-lg" width={110} height={110} />
                                    <span className="inline-block w-[112px] h-6 overflow-hidden truncate text-[14px] p-1">{item.title}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}