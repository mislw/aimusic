import { PrismaClient } from "@prisma/client";
import fs from "fs";
// import path from "path";


const prisma = new PrismaClient();

async function createSongs() {
    try {
        const songsFilePath = "app/message/newest.json";
        const songsData = JSON.parse(fs.readFileSync(songsFilePath, "utf-8"));

        // 使用 map 循环插入数据
        const createdSongs = await Promise.all(songsData.map(async (songData: { title: any; duration: any; type: any; }) => {
            return await prisma.song.create({
                data: {
                    title: songData.title,
                    likeCount: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
                    listenerCount: Math.floor(Math.random() * (700 - 400 + 1)) + 400,
                    imgUrl: `https://jubjoxlcxzzgopnerndi.supabase.co/storage/v1/object/public/music-img/${songData.title}.png`,
                    songUrl: `https://jubjoxlcxzzgopnerndi.supabase.co/storage/v1/object/public/music-list/${songData.title}.mp3`,
                    // https://jubjoxlcxzzgopnerndi.supabase.co/storage/v1/object/public/music-list/(Verse%201).mp3
                    duration: songData.duration,
                    type: songData.type
                }
            });
        }));

        console.log('Created songs:', createdSongs);
    } catch (error) {
        console.error('Error creating songs:', error);
    } finally {
        await prisma.$disconnect();
    }
}

// 调用函数来创建歌曲
createSongs();
