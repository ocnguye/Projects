import React, { useCallback } from 'react';
import Featured from './featured';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import Wishlist from './wishlist';
import Missing from './missing';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { post } from '../../api/api';


const Home: React.FC = () => {
  const { getToken } = useAuth();
  const { user: myUser } = useClerk();
  useCallback(
    async function registerUser() {
      const userId = myUser?.id;
      const name = myUser?.username;
      if (userId && name) {
        const token = await getToken();
        const streamResponse = await post('register-user/', {
          "userId": userId,
          "name": name,
        }, token);
        const responseBody = streamResponse?.config?.data;
        return responseBody;
      }
    },
    [myUser, getToken]
  );

  return (
    <div className='w-full md:flex md:justify-between h-full pt-4 pb-4'>
      <div className='w-full md:w-[78%] lg:w-[83%] xl:w-[84%] 2xl:w-[87%] space-y-8'>
        <Featured />
        <div className="bg-white shadow-md px-4 py-4">
          <h3 className='white'>MISSING FROM YOUR COLLECTION</h3>
          <Missing />
        </div>
        <div className="bg-white shadow-md px-4 py-4">
          <h3 className='white'>WISHLIST RECOMMENDATIONS</h3>
          <Wishlist />
        </div>
      </div>
      <div className=''>
        <Divider orientation="vertical" />
      </div>
      <div className='hidden md:flex mt-3'>
        <div>
          <div className='flex flex-col justify-start space-y-3'>
          
          <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
            <PersonIcon className='mr-4' />
            <Link to="/profile">
              <p className='md:text-md lg:text-xl xl:text-xl text-black'>Profile</p>
            </Link>
          </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
              <InboxIcon className='mr-4' />
              <Link to="/messages">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Messages</p>
              </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
              <FavoriteBorderOutlinedIcon className='mr-4' />
              <Link to="/favorites">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Favorites</p>
              </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
              <InventoryIcon className='mr-4' />
              <Link to="/collection">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Collection</p>
              </Link>
            </div>
            <div className='flex flex-row items-center hover:scale-110 ease-in-out duration-300'>
              <CachedIcon className='mr-4' />
              <Link to="/listings">
                <p className='md:text-md lg:text-xl xl:text-xl text-black'>Listings</p>
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
        </div>
      </div>
    </div >
  );
};

export default Home;
