import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Search from './search';
import useWindowDimensions from '../../utils/window';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Header: React.FC = () => {
    const { width } = useWindowDimensions();
    const [open, setOpen] = React.useState(false);
    const handleToggle = (next: boolean) => () => {
        setOpen(next);
    };

    const hamburger = (
        <div className='flex flex-col justify-start m-4 space-y-3'>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
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
        </div>
    )

    return (
        <div className='bg-green-100'>
            <div className='flex justify-start grid-cols-3 items-center bg-yellow-200 fixed top-0 left-0 right-0 z-10 h-20 w-full gap-2 p-2'
            >

                <Link to="/">
                    <strong className='text-green-800 font-sans font-extrabold text-xl pr-2 sm:text-3xl sm:w-full'>Angel Trading</strong>
                </Link>
                <div className='sm:flex sm:items-center hidden space-x-3 sm:text-lg flex-grow justify-center'>
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
                <div className='flex items-center justify-center sm:justify-end'>
                    <SearchIcon/>
                    <Search />
                </div>
                <div className='flex items-center justify-center pr-2 sm:hidden'>
                    <MenuIcon onClick={handleToggle(true)} sx={{justifyContent: 'center'}}/>
                    <Drawer
                        anchor='right'
                        open={open}
                        onClose={handleToggle(false)}
                    >
                        {hamburger}
                    </Drawer>
                </div>
                <Link to="/profile" className="text-black hover:text-red-400 hidden sm:flex">
                    <strong>Profile</strong>
                </Link>
            </div>

            <div className='px-5 pb-10 mt-24 flex overflow-clip'>
                <Outlet />
            </div>
        </div>
    );
};

export default Header;
