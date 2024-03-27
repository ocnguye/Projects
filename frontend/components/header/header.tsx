import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Search from './search';

const Header: React.FC = () => {
    return (
        <div className='bg-green-100'>
            <div className='flex justify-between w-full p-5 bg-yellow-200'
            style={{
                position: 'fixed',
                top: 0,
                zIndex: 100,
            }}
            >
                <div className='flex items-center justify-start mr-4 hover:scale-105 ease-in-out duration-300'>
                    <p className='md:text-3xl lg:text-5xl'>
                        <Link to="/">
                            <strong className='text-green-800'>Angel Trading Co</strong>
                        </Link>
                    </p>
                </div>
                <div className='flex items-center justify-center pt-1 '>
                    <Link to="/about" className="mx-2 text-black hover:text-green-700 hover:scale-105 ease-in-out duration-300">
                        <strong>About</strong>
                    </Link>
                    <Link to="/help" className="mx-2 text-black hover:text-green-700 hover:scale-105 ease-in-out duration-300">
                        <strong>Help</strong>
                    </Link>
                    <Link to="/contactus" className="mx-2 text-black hover:text-green-700 hover:scale-105 ease-in-out duration-300">
                        <strong>Contact Us</strong>
                    </Link>
                </div>
                <div className='flex flex-grow items-center justify-end'>
                    <div className='flex items-center hover:scale-105 ease-in-out duration-300 pr-2'>
                        <SearchIcon style={{ marginRight: 10}}/>
                        <Search />
                    </div>
                    <Link to="/profile" className="mx-2 text-black hover:text-green-700 hover:scale-105 ease-in-out duration-300">
                        <strong>Profile</strong>
                    </Link>
                </div>

            </div>
            <div className='px-5 pt-7 pb-10 mt-20'>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;
