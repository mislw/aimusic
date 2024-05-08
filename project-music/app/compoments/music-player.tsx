'use client'
import Image from "next/image";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineSkipNext, MdOutlinePlayArrow, MdOutlineSkipPrevious } from "react-icons/md";
import { CgPlayPause } from "react-icons/cg";
import { LiaRandomSolid } from "react-icons/lia";
import { PiShareNetwork } from "react-icons/pi";
import VolumeSlider from './voice'
import { useEffect, useState } from "react";
import { useRef } from "react";
import { RiPlayList2Line } from "react-icons/ri";
import { Isplaystore, MusicIdstore, LoveMusicstore, recentlyListstore, currentPlayStore } from "../data";
import { TbRepeatOnce } from "react-icons/tb";
import { FcLike } from "react-icons/fc";

export default function Play () {
    const { currentPlayList, setCurrentPlay} = currentPlayStore();
    const { isPlaying, setIsPlaying } = Isplaystore();
    // 获取被点击盒子的id
    const { musicId, setMusicId } = MusicIdstore();
    const [duration, setDuration] = useState<number>(0);
    const [currentPlayedTime, setCurrentPlayedTime] = useState<number>(0);
    let animationId: number;
    const [activeIconIndex, setActiveIconIndex] = useState(0);
    const icons = [RiPlayList2Line, LiaRandomSolid, TbRepeatOnce];
    const { loveMuisc, setLoveMusic } = LoveMusicstore();
    const {recentlyList,setrecentlyList} = recentlyListstore();

    // 添加播放模式状态
    const [playMode, setPlayMode] = useState<"normal" | "random" | "repeat">("normal");

    // 图标点击事件
    const handleClick = () => {
        setActiveIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
        // 切换播放模式
        setPlayMode(prevMode => {
            switch (prevMode) {
                case "normal": return "random";
                case "random": return "repeat";
                case "repeat": return "normal";
                default: return "normal";
            }
        });
    };
    const CurrentIcon = icons[activeIconIndex];

    // 使用ref定义两个值，可以借此获取标签
    const audioPlayer = useRef<HTMLAudioElement | null>(null); // 音频
    const progressBar = useRef<HTMLInputElement | null>(null); // input进度显示条

    useEffect(() => {
        // 初始化音频元素的音量
        if (audioPlayer.current) {
            audioPlayer.current.volume = 0.2; // 默认音量匹配VolumeSlider的初始状态
        }
    }, []);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            // 可选链（?.）操作符，这是一种安全访问对象属性的方法，可以避免在属性不存在时抛出错误
            // duration是预期获取音频时长的属性。Math.floor(...)向下取整到最接近的整数。
            const second: number = Math.floor(audioPlayer?.current?.duration || 0) // second 定义了一个新的数据，存储音频的时长
            setDuration(second); // 设置显示在页面的音乐时长
            // .current是获取最真实的Dom元素，.setAttribute为元素添加属性
            progressBar.current?.setAttribute('max', `${second}`); // 设置进度条最大显示
        };
        // addEventListener('loadedmetadata', ...) 向指定元素添加事件监听器。loadedmetadata事件会在浏览器成功加载音频文件的元数据后触发，这些元数据包括但不限于音频的时长、比特率、采样率等信息
        if (audioPlayer.current) {
            audioPlayer.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }
    }, []);

    const handleAudio = () => {
        if (!isPlaying) {
            audioPlayer?.current?.play();
            setIsPlaying(true);
            sliding();
            recentlyList.push(song);
        } else {
            audioPlayer?.current?.pause();
            setIsPlaying(false);
            cancelAnimationFrame(animationId);
        }
    }

    useEffect(() => {
        if (isPlaying) {
            audioPlayer?.current?.play();
            sliding();
            // recentlyList.push(song);
        } else {
            audioPlayer?.current?.pause();
            cancelAnimationFrame(animationId);
        }
    })

    const sliding = () => {
        if (progressBar.current && audioPlayer.current) {
            const currentValue = audioPlayer.current.currentTime;
            progressBar.current.value = `${currentValue}` || "0";
            setCurrentPlayedTime(parseInt(progressBar.current.value || "0", 10));
            progressBar.current.style.setProperty(
                '--selected-region',
                `${(parseInt(progressBar.current.value || "0", 10) / duration) * 100}%`
            );
        }
        animationId = requestAnimationFrame(sliding);
    };

    const changeRange = () => {
        const currentTimeInSeconds = parseInt(progressBar.current?.value || "0", 10);
        if (!isNaN(currentTimeInSeconds)) {
            audioPlayer.current!.currentTime = currentTimeInSeconds;
        }
        progressBar.current?.style.setProperty('--selected-region', `${(parseInt(progressBar.current?.value || "0", 10) / duration) * 100}%`)
        setCurrentPlayedTime(parseInt(progressBar.current?.value || "0", 10));
    }

    const calculateTime = (second: number) => {
        const hours: number = Math.floor(second / 3600);
        const returnedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const minutes: number = Math.floor((second % 3600) / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds: number = Math.floor(second % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedHours == '00' ? '' : returnedHours + ':'}${returnedMinutes}:${returnedSeconds}`;
    }

    // 获取当前需要播放音乐的数据，trending为当前播放的音乐列表
    // trending中的数据顺序与div和的的序号id是对应的
    let song = currentPlayList[musicId] || [];

    const handleNextSong = () => {
        if (playMode === "random") {
            // 生成一个随机索引，但不包括当前歌曲的索引
            const randomIndex = Math.floor(Math.random() * (currentPlayList.length - 1));
            // 确保新索引不等于当前索引
            const newIndex = randomIndex !== musicId ? randomIndex : randomIndex + 1;
            setMusicId(newIndex + 1);
        } else {
            // 正常逻辑
            if (musicId < currentPlayList.length) {
                setMusicId(musicId + 1);
            } else {
                // 循环回到第一首
                setMusicId(1);
            }
        }
        song = currentPlayList[musicId];
        setCurrentPlayedTime(0);
    };

    const handlePrevSong = () => {
        let newIndex;
        if (playMode === "random") {
            // 生成一个随机索引，但不包括当前歌曲的索引
            do {
                newIndex = Math.floor(Math.random() * currentPlayList.length);
            } while (newIndex === musicId); // 确保新索引不等于当前索引
        } else {
            // 正常逻辑
            if (musicId > 0) {
                newIndex = (musicId - 1) % currentPlayList.length;
            } else {
                newIndex = currentPlayList.length - 1; // 循环到最后一首
            }
        }
        setMusicId(newIndex);
        setCurrentPlayedTime(0);
    };

    useEffect(() => {
        const handleEnded = () => {
            if (playMode === "repeat") {
                // 确保 audioPlayer.current 不为 null 且 currentTime 可以被赋值
                if (audioPlayer.current) {
                    const currentTimeProperty = audioPlayer.current.currentTime as number; // 类型断言为number
                    audioPlayer.current.currentTime = currentTimeProperty; // 重新赋值以满足TypeScript
                    audioPlayer.current.play();
                }
            } else {
                // 其他模式下，按原逻辑处理下一首
                handleNextSong();
            }
        };

        if (audioPlayer.current) {
            audioPlayer.current?.addEventListener('ended', handleEnded);
            return () => {
                audioPlayer.current?.removeEventListener('ended', handleEnded);
            };
        }
    }, [playMode, handleNextSong]);

    const handlelove = (item: any) => {
        if (song.love) {
            currentPlayList[musicId].love = false;
            loveMuisc.push(item);
            console.log(loveMuisc)
        } else {
            currentPlayList[musicId].love = true;
            const index = loveMuisc.indexOf(item);
            if (index > -1) {
                loveMuisc.splice(index, 1); // 删除找到的值
            }
        }
    }

    return (
        <div className="w-full fixed bottom-0">
            <div className="">
                {/* {song && ( */}
                    <audio ref={audioPlayer} src={song.songUrl} ></audio>
                {/* )} */}
                <div className="w-full h-1 relative">
                    <div className="range">
                        <input type="range" className='w-full' defaultValue="0" ref={progressBar} onChange={changeRange} />
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center bg-[rgb(242,242,242)] p-4 z-10 ">
                <Image width={60} height={60} alt="" src={song.imgUrl} className="rounded-lg" />
                <span className="ml-3 min-w-[300px] ">
                    <div>{song.title}</div>
                    <div>
                        <span>{calculateTime(currentPlayedTime)} / {calculateTime(duration)}</span>
                        <span className="bg-yellow-400 rounded-lg ml-2 px-1">suno</span>
                    </div>
                </span>
                <span className="flex items-center justify-between mx-auto">
                    <button onClick={() => handlelove(song)}>
                        {
                            song.love ? <IoHeartOutline className="w-[24px] h-[24px] mr-8 text-[rgb(100,116,139)]}" /> : <FcLike className="w-[24px] h-[24px] mr-8 text-yellow-400" />
                        }
                    </button>
                    <button onClick={() => handlePrevSong()}><MdOutlineSkipPrevious className="w-[30px] h-[30px] mr-8 text-yellow-400" /></button>
                    <button onClick={() => handleAudio()}>{isPlaying ? <CgPlayPause className="w-[36px] h-[36px] p-1 mr-8 bg-yellow-400 rounded-[50%]" /> : <MdOutlinePlayArrow className="w-[36px] h-[36px] p-1 mr-8 bg-yellow-400 rounded-[50%]" />}</button>
                    <button onClick={() => handleNextSong()}><MdOutlineSkipNext className="w-[30px] h-[30px] mr-8 text-yellow-400" /></button>
                    <div onClick={() => handleClick()}>
                        <CurrentIcon className="w-[24px] h-[24px] text-[rgb(100,116,139)]" />
                    </div>
                </span>
                <span className="flex items-center justify-between ">
                    <PiShareNetwork className="mr-2 w-[22px] h-[22px]" />
                    <VolumeSlider audioRef={audioPlayer} />
                </span>
            </div>
        </div>
    )
}


