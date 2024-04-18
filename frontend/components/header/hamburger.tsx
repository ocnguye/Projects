import React from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import useWindowDimensions from '../../utils/window';

const Hamburger = (
    <>
        <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
            <Badge className="mr-4" badgeContent={4} color="primary">
                <InboxIcon style={{ zIndex: 0 }} />
            </Badge>
            <Link to="/messages">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Messages</p>
            </Link>
        </div>
        <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
            <FavoriteBorderOutlinedIcon className='mr-4' />
            <Link to="/favorites">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Favorites</p>
            </Link>
        </div>
        <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
            <InventoryIcon className='mr-4' />
            <Link to="/collection">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Collection</p>
            </Link>
        </div>
        <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
            <CachedIcon className='mr-4' />
            <Link to="/trades">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Trades</p>
            </Link>
        </div>
        <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
            <Badge className="mr-4" badgeContent={2} color="primary">
                <CalendarMonthIcon />
            </Badge>
            <Link to="/events">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Events</p>
            </Link>
        </div>
    </>
)