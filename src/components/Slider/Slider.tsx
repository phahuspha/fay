"use client";

import React, { useEffect, useState } from 'react';
import { imgslide } from '../../data/datatest';
import Image from 'next/image';
import DEscription from '../Description';


const Slider = () => {
    const [activeImage, setActiveImage] = useState(0);

    const clickNext = () => {
        activeImage === imgslide.length - 1
            ? setActiveImage(0)
            : setActiveImage(activeImage + 1)
    };
    const clickPrev = () => {
        activeImage === 0
            ? setActiveImage(imgslide.length - 1)
            : setActiveImage(activeImage - 1)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            clickNext();
        }, 5000);
        return () =>{
            clearTimeout(timer);
        };
    }, [activeImage]);

    return (
        <div className='grid place-items-center grid-cols-2 w-full mx-auto shadow-xl rounded-2xl'>
            <div className='w-full flex justify-center gap-4 transition-transform ease-in-out decoration-500 rounded-2xl'>
                {imgslide.map((pic, idx) => (
                    <div className={` ${
                        idx === activeImage
                            ? `block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out px-5`
                            : `hidden`
                        }`}
                        key={idx}>
                        <Image
                            src={pic.src}
                            alt=''
                            width={400}
                            height={400}
                            className='w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl'
                        />
                    </div>
                ))}
            </div>
            <DEscription
                activeImgIndex={activeImage}
                clickNext={clickNext}
                clickPrev={clickPrev}
            />

        </div>
    )
}
export default Slider;