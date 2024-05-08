'use client'
import React, { useState, useEffect } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VolumeSliderProps {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ audioRef }) => {
    const [volume, setVolume] = useState(0.2);
    const [isMuted, setIsMuted] = useState(false);
    
    useEffect(() => {
        // 设置音频音量
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (volume === 0) setIsMuted(true);
            else setIsMuted(false);
        }
    }, [volume, audioRef]);

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseFloat(event.target.value));
    };

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--filled-percentage',
            `${(volume * 100).toFixed(2)}%`
        );
        if (volume === 0) setIsMuted(true);
        else setIsMuted(false);
    }, [volume]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
            if (!isMuted) {
                audioRef.current.volume = volume; // 恢复之前设定的音量
            }else{
                audioRef.current.volume = 0;
            }
        }
    };

    return (
        <>
            <button
                onClick={toggleMute}
                className="flex-shrink-0 w-[30px] h-[30px] mr-1 p-1 hover:text-gray-800 focus:outline-none"
            >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <div className="relative w-[160px] h-1">
                {/* 滑动条代码保持不变 */}
                <div
                    className={`VolumeSlider-progress-bar absolute inset-0 w-full h-1 transition-width duration-300 ease-in-out before:w-[calc(var(--filled-percentage, 20%))]`}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    className="volume-slider range absolute inset-0 w-full h-full "
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </>
    );
};

export default VolumeSlider;