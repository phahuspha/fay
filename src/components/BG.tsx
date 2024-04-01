// components/DarkImageBackground.tsx or in any of your page .tsx files

import React from 'react';

const DarkImageBackground = () => {
    return (
        <div className="w-screen h-screen fixed z-[-1] bg">
            <img
                src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/1ceeaa24-0a52-4288-a124-bcfd8f35ef00/w2xl"
                alt="Picture of the author"
                className='object-cover w-screen h-screen'
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent group-hover:from-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent group-hover:from-transparent"></div>

            {/* Your content goes here */}
        </div>
    );
};

export default DarkImageBackground;