'use client'
import clsx from "clsx"
import Image from "next/image"
import { IoHeadset } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { playstore, Isplaystore, MusicIdstore, currentPlayStore, musicList } from "../data";
interface DiscoverProps {
    data: musicList[];
}

const Common: React.FC<DiscoverProps> = ({ data }) => {
    const { play, setplay } = playstore();
    const { isPlaying, setIsPlaying } = Isplaystore();
    const { musicId, setMusicId } = MusicIdstore();
    const { currentPlayList, setCurrentPlay } = currentPlayStore();

    const handleplay = (item: number) => {
        setCurrentPlay(data)
        setplay(true);
        if (musicId === item) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true)
        }
        // 设置当前点击的标签，就修改MusicID的值
        setMusicId(item);
    }

    return (
        <>
            <table>
                <thead className="hover:bg-[rgb(250,250,249)]">
                    <tr className="border-b text-[rgb(151,145,141)]">
                        <th className="w-16 text-left p-2 font-normal">#</th>
                        <th className="w-36 text-left p-2 font-normal"></th>
                        <th className="w-[18%] text-left p-2 font-normal">Title</th>
                        <th className="w-[50%] text-left p-2 font-normal">Tags</th>
                        <th className="w-36 text-left p-2 font-normal">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) => (
                        <tr key={item.id} className={clsx("border-b hover:bg-[#d4d4d182]",
                            {
                                'bg-[#e4e4e436]': musicId == item.id
                            }
                        )} onClick={() => handleplay(index)}>
                            <td className="w-20 text-left p-2">{index+1}</td>
                            <td className="text-left p-4">
                                <Image width={66} height={66} alt="" src={item.imgUrl} className="rounded-lg"></Image>
                            </td>
                            <td className="w-[18%] text-left p-2 text-[14px]">
                                <div className="w-full h-[24px] overflow-hidden text-ellipsis whitespace-no-wrap max-w-[100%] truncate">
                                    {item.title}
                                </div>
                                <span className="flex items-center pt-2">
                                    <IoHeadset />
                                    <p className="pr-4 pl-1">{item.listenerCount}</p>
                                    <AiOutlineLike />{item.likeCount}
                                </span>
                            </td>
                            <td className="w-[44%] text-left p-4">{item.type}</td>
                            <td className="w-[200px] text-left p-4">{item.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Common;
