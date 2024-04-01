// components/Navbar.tsx

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`p-3 ${isSticky ? 'bg-pink-600 fixed top-0 left-0 right-0 z-10' : 'bg-pink-600'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href='/'>
                        <img src="https://i.pinimg.com/564x/b1/7e/c8/b17ec8045c7cf08566c50d6e0e506158.jpg" className='rounded-full w-16 h-16' alt="" />
                    </Link>

                    <div className="hidden md:block">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/">
                                    <p className="text-white hover:text-gray-300">Home</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <p className="text-white hover:text-gray-300">About</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <p className="text-white hover:text-gray-300">Contact</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
