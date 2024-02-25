import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Search from './search';

const Header: React.FC = () => {
    return (
        <div>
            <div className='flex justify-between w-full'>
                <div className='flex items-center justify-start pl-5 mr-4'>
                    <h1 className=''>
                        <Link to="/">
                            <strong className='text-darkgreen'>Angel Trading Co</strong>
                        </Link>
                    </h1>
                </div>
                <div className='flex items-center justify-center pt-1'>
                    <Link to="/about" className="mx-2 text-black hover:text-reddishpink">
                        <strong>About</strong>
                    </Link>
                    <Link to="/help" className="mx-2 text-black hover:text-reddishpink">
                        <strong>Help</strong>
                    </Link>
                    <Link to="/contactus" className="mx-2 text-black hover:text-reddishpink">
                        <strong>Contact Us</strong>
                    </Link>
                </div>
                <div className='flex flex-grow items-center justify-end pr-5'>
                    <Search/>
                    <Link to="/profile" className="mx-2 text-black hover:text-reddishpink">
                        <strong>Profile</strong>
                    </Link>
                </div>

            </div>
            <Outlet />
        </div>
    );
};

export default Header;
