import React, { ReactNode, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderSquareProps {
  auto?: boolean;
  children: ReactNode; // This type is used for declaring children
}

const SliderSquare: React.FC<SliderSquareProps> = ({ auto = true, children }) => {
    const [activeImage, setActiveImage] = useState(0);

    // Adjust your click handlers and useEffect hook as needed, especially if the number of children impacts the behavior

    useEffect(() => {
        // If auto is true, automatically cycle through children
        if (auto) {
            const timer = setTimeout(() => {
                clickNext();
            }, 5000); // Adjust time as needed
            return () => clearTimeout(timer);
        }
    }, [activeImage, auto]);

    const clickNext = () => {
        setActiveImage((prevActiveImage) => {
            const newIndex = prevActiveImage + 1;
            return newIndex % React.Children.count(children);
        });
    };

    const clickPrev = () => {
        setActiveImage((prevActiveImage) => {
            const newIndex = prevActiveImage - 1;
            const count = React.Children.count(children);
            return (newIndex < 0 ? count - 1 : newIndex) % count;
        });
    };

    return (
        <div className='w-screen h-screen relative'>
            <div className="h-[100vh] m-auto">
                {/* Render active child */}
                {React.Children.toArray(children)[activeImage]}
                <button onClick={clickPrev} className='absolute top-0 left-0 h-screen px-4 flex items-center justify-center cursor-pointer text-4xl opacity-50 hover:opacity-100 z-10'>
                    <FaChevronLeft />
                </button>
                <button onClick={clickNext} className='absolute top-0 right-0 h-screen px-4 flex items-center justify-center cursor-pointer text-4xl opacity-50 hover:opacity-100 z-10'>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default SliderSquare;
