import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as mm from 'music-metadata-browser';

interface SongUrl {
    url: string;
}

const Mp3Info: React.FC<SongUrl> = ({ url }) => {
    const [metadata, setMetadata] = useState<any>(null);

    useEffect(() => {
        async function parseMP3Details() {
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const metadata = await mm.parseBlob(new Blob([arrayBuffer]));
                setMetadata(metadata);
            } catch (error) {
                console.error('解析 MP3 文件失败：', error);
            }
        }

        parseMP3Details();
    }, [url]);

    return (
        <div>
            {metadata && metadata.common.picture && metadata.common.picture.map((picture: any, index: number) => (
                <div key={index}>
                    <Image width={picture.width || 110} height={picture.height || 110} alt={metadata.common.title} src={`data:${picture.format};base64,${picture.data.toString('base64')}`} className="rounded-lg" />
                    <span className="inline-block w-[112px] h-6 overflow-hidden truncate text-[14px] p-1">{metadata.common.title}</span>
                </div>
            ))}
        </div>
    );
}

export default Mp3Info;

{/* <img alt="Guys what is wrong with my cat?" loading="lazy" width="128" height="128" decoding="async" data-nimg="1" class="h-fit w-fit object-cover opacity-[0.3]" style="color:transparent" srcset="/_next/image?url=https%3A%2F%2Fcdn1.suno.ai%2Fimage_4c8d7e14-639b-4876-a245-7f79f52979bc.png&amp;w=128&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fcdn1.suno.ai%2Fimage_4c8d7e14-639b-4876-a245-7f79f52979bc.png&amp;w=256&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fcdn1.suno.ai%2Fimage_4c8d7e14-639b-4876-a245-7f79f52979bc.png&amp;w=256&amp;q=75"></img> */}