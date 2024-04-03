import React from 'react';
import Featured from './featured';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';
import CachedIcon from '@mui/icons-material/Cached';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Wishlist from './wishlist';
import Missing from './missing';
import useWindowDimensions from '../../utils/window';

const Home: React.FC = () => {
    const { width } = useWindowDimensions();
    return (
        <section className='w-full flex'>
            <div className='space-y-2'>
                <Featured />
                <p>Missing From Your Collection</p>
                <Missing />
                <p>Wishlist Recommendations</p>
                <Wishlist />
            </div>
            <div>
                {/*sidebar*/}
            </div>
        </section>
        // <Box sx={{ flexGrow: 1}} >
        //     <Grid container spacing={2}>
        //         <Grid xs={ width < 800 ? 8 : ( width < 1300 ? 9.5 : 10.25) }>
        //             <Box sx={{ flexGrow: 1 }}>
        //                 <Grid container spacing={2}>
        //                     <Grid xs={12}>
        //                         <div className='hover:scale-101 ease-in-out duration-300'>
        //                             <Featured />
        //                         </div>
        //                     </Grid>
        //                     <Grid xs={12} style={{overflowX: 'auto', overflowY: 'hidden'}}>
        //                         <p>Wishlist Recommendations</p>
        //                         <Wishlist />
        //                     </Grid>
        //                     <Grid xs={12} style={{overflowX: 'auto', overflowY: 'hidden'}}>
        //                         <p>Missing From Your Collection</p>
        //                         <Missing />
        //                     </Grid>
        //                 </Grid>
        //             </Box>
        //         </Grid>

        //         {/* <Grid xs={ width < 800 ? 4.0 : ( width < 1300 ? 2.5 : 1.75)  }>
        //             <Box sx={{ flexGrow: 1 }}>
        //                 <Grid container spacing={2}>
        //                     <Grid xs={2}>
        //                         <Divider orientation="vertical"/>
        //                     </Grid>
        //                     <Grid xs={10}>
        //                         <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
        //                             <Badge className="mr-4" badgeContent={4} color="primary">
        //                                 <InboxIcon style={{ zIndex:0 }}/>
        //                             </Badge>
        //                             <Link to="/messages">
        //                                 <p className='md:text-md lg:text-xl xl:text-xl text-black'>Messages</p>
        //                             </Link>
        //                         </div>
        //                         <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
        //                             <FavoriteBorderOutlinedIcon className='mr-4'/>
        //                             <Link to="/favorites">
        //                                 <p className='md:text-md lg:text-xl xl:text-xl text-black'>Favorites</p>
        //                             </Link>
        //                         </div>
        //                         <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
        //                             <InventoryIcon className='mr-4'/>
        //                             <Link to="/collection">
        //                                 <p className='md:text-md lg:text-xl xl:text-xl text-black'>Collection</p>
        //                             </Link>
        //                         </div>
        //                         <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
        //                             <CachedIcon className='mr-4'/>
        //                             <Link to="/trades">
        //                                 <p className='md:text-md lg:text-xl xl:text-xl text-black'>Trades</p>
        //                             </Link>
        //                         </div>
        //                         <div className='flex flex-row items-center my-6 hover:scale-110 ease-in-out duration-300'>
        //                             <Badge className="mr-4" badgeContent={2} color="primary">
        //                                 <CalendarMonthIcon />
        //                             </Badge>
        //                             <Link to="/events">
        //                                 <p className='md:text-md lg:text-xl xl:text-xl text-black'>Events</p>
        //                             </Link>
        //                         </div>
        //                     </Grid>
        //                 </Grid>
        //             </Box>
        //         </Grid> */}
        //     </Grid>
        // </Box>
    );
};

export default Home;
