"use client"
import { create } from "zustand"
import { useState } from "react"

// 判断是否登录
type Store = {
    login: boolean
    setValue: (newValue: boolean) => void;
}

export const loginstore = create<Store>()((set) => ({
    login: false,
    setValue: (newValue) => set({ login: newValue }),
}))


type loveIcon = {
    loveIcon: any;
    setloveIcon: (newVaule: any) => void;
}
export const loveIconstore = create<loveIcon>()((set) => ({
    loveIcon: false,
    setloveIcon: (newValue) => set({ loveIcon: newValue })
}))

type LoveMusic = {
    loveMuisc: any;
    setLoveMusic: (newVaule: any) => void;
}
export const LoveMusicstore = create<LoveMusic>()((set) => ({
    loveMuisc: [],
    setLoveMusic: (newValue) => set({ loveMuisc: newValue })
}))

// 控制是否播放
type Play = {
    play: boolean;
    setplay: (newVaule: boolean) => void;
}
export const playstore = create<Play>()((set) => ({
    play: false,
    setplay: (newValue) => set({ play: newValue })
}))

// 控制是否显示播放按钮
type Isplay = {
    isPlaying: boolean;
    setIsPlaying: (newVaule: boolean) => void;
}
export const Isplaystore = create<Isplay>()((set) => ({
    isPlaying: false,
    setIsPlaying: (newValue) => set({ isPlaying: newValue })
}))

// 当前点击盒子的id
type MusicID = {
    musicId: number;
    setMusicId: (newVaule: number) => void;
}
export const MusicIdstore = create<MusicID>()((set) => ({
    musicId: 1,
    setMusicId: (newValue) => set({ musicId: newValue })
}))


type recentlyList = {
    recentlyList: any;
    setrecentlyList: (newVaule: any) => void;
}
export const recentlyListstore = create<recentlyList>()((set) => ({
    recentlyList: [],
    setrecentlyList: (newValue) => set({ recentlyList: newValue })
}))

export type musicList = {
    title: string
    id: number
    imgUrl: string
    songUrl: string
    love: boolean
    type: string
    likeCount: number
    listenerCount: number
    duration:string
}

type NewestList = {
    newestData: musicList[]; // 使用上面定义的对象类型
    setNewestData: (newValue: musicList[]) => void;
};

export const newestListStore = create<NewestList>((set) => ({
    newestData: [],
    setNewestData: (newValue) => set({ newestData: newValue }),
}));

type roamingList = {
    roamingList: musicList[]; // 使用上面定义的对象类型
    setRoamingList: (newValue: musicList[]) => void;
};

export const roamingListStore = create<roamingList>((set) => ({
    roamingList: [],
    setRoamingList: (newValue) => set({ roamingList: newValue }),
}));

type trendingList = {
    trendingList: musicList[]; // 使用上面定义的对象类型
    setTrendingList: (newValue: musicList[]) => void;
};

export const trendingStore = create<trendingList>((set) => ({
    trendingList: [],
    setTrendingList: (newValue) => set({ trendingList: newValue }),
}));

type currentPlay = {
    currentPlayList : musicList[],
    setCurrentPlay: (newValue: musicList[]) => void;
};
export const currentPlayStore = create<currentPlay>((set) => ({
    currentPlayList: [],
    setCurrentPlay: (newValue) => set({ currentPlayList: newValue }),
}));
