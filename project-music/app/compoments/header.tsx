'use client'
import Link from "next/link";
import { BsEmojiSunglasses } from "react-icons/bs";
import React, { useState } from 'react';


export default function Header() {
    // 步骤1：创建状态来跟踪当前的语言和下拉框的显示状态
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // 步骤2：编写一个函数来切换下拉框的显示与隐藏
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    // 步骤3：编写一个函数来选择语言并更新按钮上的文本
    const selectLanguage = (language: React.SetStateAction<string>) => {
        setCurrentLanguage(language);
        toggleDropdown(); // 选择语言后隐藏下拉框
    };
    return (
        <section className="divide-y divide-gray-500">
            <div className="bg-[#f0f0f0] flex h-[80px] ">
                <Link href="/" className="">
                    <img src="/logo.png"
                        alt="Logo"
                        className="flex h-[64px] w-[64px] ml-10 mt-2"
                    /></Link>
                <div className="flex items-center text-2xl ml-2">
                    <span className="font-medium">
                        <Link href="/">mislw</Link></span>
                </div>

                <div className="flex items-center font-weight text-xl absolute top-2 right-20 space-x-9 ">
                    <div className="flex">
                        <BsEmojiSunglasses />
                    </div>
                     {/* 步骤1：移动下拉框到按钮下方 */}
                    <div className="relative">
                        <button
                            className="border-2 border-[#615f5f9e] px-4 py-2 bg-[#f1efef] rounded-lg"
                            onClick={toggleDropdown}
                        >
                            {currentLanguage}
                        </button>

                        {/* 将下拉框移到按钮下方 */}
                        {dropdownVisible && (
                            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg">
                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={() => selectLanguage('English')}>
                                    English
                                </button>
                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={() => selectLanguage('French')}>
                                    French
                                </button>
                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={() => selectLanguage('German')}>
                                German
                                </button>
                                <button className="block w-full px-4 py-2 text-left hover:bg-gray-200" onClick={() => selectLanguage('中文')}>
                                中文
                                </button>
                                {/* 添加更多语言选项 */}
                            </div>
                        )}
                    </div>
                    <Link href="/Login">
                    <button className="border-2 px-4 py-2 bg-[#FACC15] rounded-lg">Sign in</button></Link>
                </div>
            </div>
            <div></div>
        </section>
    );
}