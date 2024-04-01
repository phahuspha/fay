import React, { useEffect, useState, ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderIndexProps {
    children: ReactNode | ReactNode[]; // Accepts single or multiple children
}

const SliderIndex: React.FC<SliderIndexProps> = ({ children }) => {
    const childrenArray = React.Children.toArray(children); // Ensure children are an array
    const [activeImage, setActiveImage] = useState(0);

    const clickNext = () => {
        setActiveImage(prev => (prev + 1) % childrenArray.length); // Cycle to the next child
    };
    const clickPrev = () => {
        setActiveImage(prev => (prev - 1 + childrenArray.length) % childrenArray.length); // Cycle to the previous child
    };

    useEffect(() => {
        const timer = setTimeout(clickNext, 3000);
        return () => clearTimeout(timer);
    }, [activeImage, childrenArray.length]);

    return (
        <div className='w-full h-full container m-auto transition-transform ease-in-out duration-500 flex justify-center'>
            {childrenArray[activeImage]}
            <button onClick={clickPrev} className='absolute top-0 left-0 h-full text-white text-4xl opacity-50 hover:opacity-100'>
                <FaChevronLeft />
            </button>
            <button onClick={clickNext} className='absolute top-0 right-0 h-full text-white text-4xl opacity-50 hover:opacity-100'>
                <FaChevronRight />
            </button>
        </div>
    );
};

export default SliderIndex;