import React, { ReactNode, useEffect, useState } from 'react';
import { imgslide } from '../../data/datatest';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
interface SliderClothSquareProps {
    children: ReactNode;
    auto?: boolean;
}

const SliderClothSquare: React.FC<SliderClothSquareProps> = ({ children, auto = true }) => {

    const [activeImage, setActiveImage] = useState(0);

    const clickNext = () => {
        activeImage === imgslide.length - 1
            ? setActiveImage(0)
            : setActiveImage(activeImage + 1);
    };
    const clickPrev = () => {
        activeImage === 0
            ? setActiveImage(imgslide.length - 1)
            : setActiveImage(activeImage - 1);
    };

    useEffect(() => {
        // Only set up the auto-slide if auto is true
        if (auto) {
            const timer = setTimeout(() => {
                clickNext();
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [activeImage, auto]); // Include auto in the dependency array

    return (
        <div className='w-screen h-screen'>
            <div className="h-[100vh] m-auto aspect-[1/1]">
                {children}
                {/* <button onClick={clickNext} className='flex text-black items-center absolute top-0 left-0 w-max h-screen cursor-pointer text-4xl opacity-50 hover:opacity-100 drop-shadow'>
                    <FaChevronLeft className='' />
                </button>
                <button onClick={clickPrev} className='flex text-black items-center absolute top-0 right-0 w-max h-screen cursor-pointer text-4xl opacity-50 hover:opacity-100 drop-shadow'>
                    <FaChevronRight />
                </button> */}
            </div>
        </div>
    );
};

export default SliderClothSquare;
