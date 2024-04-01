import React from 'react';
import { FaFacebook, FaInstagram, FaLine } from 'react-icons/fa';

interface BoxTextProps {
    data: {
        name: string;
        facebook: string;
        instagram: string;
        line: string;
        caption: string;
    };
}

const BoxText: React.FC<BoxTextProps> = ({ data }) => {
    const { name, facebook, instagram, line, caption } = data;
    const isOtherInfoEmpty = !facebook && !instagram && !line;

    return (
        <div className={`w-full h-[180px] flex flex-col bg-white rounded-lg p-4 items-center justify-center mt-2 ${!caption && !name && isOtherInfoEmpty ? 'hidden' : ''}`} >
            <div className="flex justify-around w-full items-center p-1 md:p-2 ">
                {caption && (
                    <div id='show_caption' className="font-extrabold text-5xl break-words leading-normal overflow-hidden text-center">
                        {caption}
                    </div>
                )}
                {name && (
                    <div id='show_name' className='font-extrabold text-3xl break-words' >
                        {name}
                    </div>
                )}
            </div>
            <div className="flex justify-around w-full">
                {facebook && (
                    <div id='show_facebook' className='font-black leading-relaxed text-3xl flex items-center text-blue-600'>
                        <FaFacebook className='mr-1' /> : {facebook}
                    </div>
                )}
                {instagram && (
                    <div id='show_instagram' className='font-black leading-relaxed text-3xl flex items-center text-pink-600'>
                        <FaInstagram className='mr-1' /> : {instagram}
                    </div>
                )}
                {line && (
                    <div id='show_line' className='font-black leading-relaxed text-3xl flex items-center text-green-600'>
                        <FaLine className='mr-1' /> : {line}
                    </div>
                )}
            </div>
        </div>

    );
}

export default BoxText;
