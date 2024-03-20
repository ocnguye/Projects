import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Search from './search';

const Header: React.FC = () => {
    return (
        <div className='pl-10 pr-10'>
            <div className='flex justify-between w-full py-5'>
                <div className='flex items-center justify-start mr-4'>
                    <h1 className=''>
                        <Link to="/">
                            <strong className='text-green-600'>Angel Trading Co</strong>
                        </Link>
                    </h1>
                </div>
                <div className='flex items-center justify-center pt-1'>
                    <Link to="/about" className="mx-2 text-black hover:text-pink-100">
                        <strong>About</strong>
                    </Link>
                    <Link to="/help" className="mx-2 text-black hover:text-pink-100">
                        <strong>Help</strong>
                    </Link>
                    <Link to="/contactus" className="mx-2 text-black hover:text-pink-100">
                        <strong>Contact Us</strong>
                    </Link>
                </div>
                <div className='flex flex-grow items-center justify-end'>
                    <SearchIcon style={{ marginRight: 10}}/>
                    <Search/>
                    <Link to="/profile" className="mx-2 text-black hover:text-pink-100">
                        <strong>Profile</strong>
                    </Link>
                </div>

            </div>
            <Outlet />
        </div>
    );
};

export default Header;
