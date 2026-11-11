import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className='bg-amber-100'>
            <div className="flex justify-between items-center py-3 container mx-auto max-w-6xl">
                {/* logo */}
                <div className="flex items-center gap-1">
                    <Image
                        src='/people.png'
                        alt='Socially'
                        width={40}
                        height={40}
                        loading='eager'
                        className=''
                    />
                    <h1 className='text-xl font-bold'>Socially</h1>
                </div>

                <Link href='#' className='relative text-lg text-foreground transition-colors duration-300
  after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0
  after:bg-primary after:transition-all after:duration-300
  hover:text-primary hover:after:w-full font-bold'>Upcoming Events</Link>
                {/* auth  */}
                <div className="">
                    <Button>
                        <Link href={'/signin'}>
                            Sign in
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;