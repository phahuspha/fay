import React from 'react';
import { imgslide } from '../data/datatest';
import Image from 'next/image';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

type Props = {
    clickNext: any,
    clickPrev: any,
    activeImgIndex: any,
}

const DEscription = ({ clickPrev, clickNext, activeImgIndex }: Props) => {
    return (
        <div className='grid place-items-start w-full relative rounded-3xl'>
            <div className='text-sm absolute right-4 top-2 underline-offset-4 '>
                <Image src='/images/LogoMPT.png' alt='' width={50} height={50} />
            </div>
            {imgslide.map((elem, idx) => (
                <div
                    className={` ${idx === activeImgIndex
                            ? `block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out pl-10`
                            : `hidden`
                        }`}
                    key={idx}
                >
                    <div className='py-16 font-extrabold text-3xl'>{elem.name}</div>
                    <div className='font-black leading-relaxed text-3xl'>IG: <span className='text-orange-600'>{elem.ig}</span></div>
                    <div className='font-black leading-relaxed text-3xl'>Facebook: <span className='text-blue-600'>{elem.fb}</span></div>
                    <div className='font-black leading-relaxed text-3xl'>Tel. :{elem.phone}</div>

                    <div className='absolute bottom-2 w-full flex justify-center items-center'>
                        <div onClick={clickPrev} className='absolute bottom-2 right-32 cursor-pointer'>
                            {/* <Image src={''} alt='' width={50} height={50}  /> */}
                            <BiLeftArrow />
                        </div>
                        <div onClick={clickNext} className='absolute bottom-2 right-20 cursor-pointer'>
                            {/* <Image src={''} alt='' width={50} height={50}  /> */}
                            <BiRightArrow />
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
export default DEscription;