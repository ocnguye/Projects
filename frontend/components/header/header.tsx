import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Search from './search';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

const Header: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleToggle = (next: boolean) => () => {
        setOpen(next);
    };

    const hamburger = (
        <div className='flex flex-col align-center justify-start p-2 space-y-3 bg-green-100 h-full pt-5'>
            <div className='h-10 flex justify-between items-center'>
                <strong className='text-xl w-1/2'>Angel Trading</strong>
                <div className='hover:cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 rounded-full align-middle p-2'>
                    <CloseIcon onClick={handleToggle(false)} fontSize="medium" sx={{justifyContent: 'center'}}/>
                </div>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300 pt-5'>
                <Badge className="mr-4" badgeContent={4} color="primary">
                    <InboxIcon style={{ zIndex:0 }}/>
                </Badge>
                <Link to="/messages">
                    <p className='text-black'>Messages</p>
                </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
                <FavoriteBorderOutlinedIcon className='mr-4'/>
                <Link to="/favorites">
                    <p className='md:text-md lg:text-xl xl:text-xl text-black'>Favorites</p>
                </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
                <InventoryIcon className='mr-4'/>
                <Link to="/collection">
                    <p className='md:text-md lg:text-xl xl:text-xl text-black'>Collection</p>
                </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
                <CachedIcon className='mr-4'/>
                <Link to="/trades">
                    <p className='md:text-md lg:text-xl xl:text-xl text-black'>Trades</p>
                </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
                <Badge className="mr-4" badgeContent={2} color="primary">
                    <CalendarMonthIcon />
                </Badge>
                <Link to="/events">
                    <p className='md:text-md lg:text-xl xl:text-xl text-black'>Events</p>
                </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
                <PersonIcon className='mr-4'/>
                <Link to="/profile">
                    <p className='md:text-md lg:text-xl xl:text-xl text-black'>Profile</p>
                </Link>
            </div>
        </div>
    )

    return (
        <div className='bg-green-100 w-full'>
            <div className='flex justify-between grid-cols-3 items-center bg-yellow-200 h-20 gap-2 pt-2 px-2'
            >
                <Link to="/">
                    <strong className='text-green-800 font-extrabold text-2xl sm:text-3xl pr-2 md:text-4xl md:w-full'>Angel Trading</strong>
                </Link>
                <div className='md:flex md:items-center hidden space-x-3 md:text-lg flex-grow justify-center'>
                    <Link to="/about" className="text-black hover:text-red-400">
                        <strong>About</strong>
                    </Link>
                    <Link to="/help" className="text-black hover:text-red-400">
                        <strong>Help</strong>
                    </Link>
                    <Link to="/contactus" className="text-black hover:text-red-400 ">
                        <strong>Contact</strong>
                    </Link>
                </div>
                <div className='flex flex-shrink items-center justify-center md:justify-end place-self-center'>
                    <SearchIcon/>
                    <Search />
                </div>
                <div className='flex items-center justify-center p-2 md:hidden hover:cursor-pointer hover:bg-gray-700 hover:bg-opacity-20 rounded-full align-middle'>
                    <MenuIcon onClick={handleToggle(true)} sx={{justifyContent: 'center'}}/>
                    <Drawer
                        anchor='right'
                        open={open}
                        onClose={handleToggle(false)}
                    >
                        {hamburger}
                    </Drawer>
                </div>
                <Link to="/profile" className="text-black hover:text-red-400 hidden md:flex">
                    <strong>Profile</strong>
                </Link>
            </div>

            <div className='pb-10 bg-green-100 flex mx-2 mt-2'>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;
