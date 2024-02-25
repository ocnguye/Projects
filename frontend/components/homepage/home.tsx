import React from 'react';
import Featured from './featured';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Home: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1}} >
            <Grid container spacing={2}>
                <Grid xs={10.5}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Featured />
                            </Grid>
                            <Grid xs={12} style={{overflowX: 'auto', overflowY: 'hidden'}}>
                                <p>Wishlist Recommendations</p>
                                <Wishlist />
                            </Grid>
                            <Grid xs={12} style={{overflowX: 'auto', overflowY: 'hidden'}}>
                                <p>Missing From Your Collection</p>
                                <Missing />
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
                <Grid xs={1.5}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid xs={2}>
                                <Divider orientation="vertical"/>
                            </Grid>
                            <Grid xs={10}>
                                <div className='flex flex-row items-center my-6'>
                                    <Badge className="mr-4" badgeContent={4} color="primary">
                                        <InboxIcon/>
                                    </Badge>
                                    <Link to="/messages">
                                        <p className='text-xl text-black'>Messages</p>
                                    </Link>
                                </div>
                                <div className='flex flex-row items-center my-6'>
                                    <FavoriteBorderOutlinedIcon className='mr-4'/>
                                    <Link to="/favorites">
                                        <p className='text-xl text-black'>Favorites</p>
                                    </Link>
                                </div>
                                <div className='flex flex-row items-center my-6'>
                                    <InventoryIcon className='mr-4'/>
                                    <Link to="/collection">
                                        <p className='text-xl text-black'>Collection</p>
                                    </Link>
                                </div>
                                <div className='flex flex-row items-center my-6'>
                                    <CachedIcon className='mr-4'/>
                                    <Link to="/trades">
                                        <p className='text-xl text-black'>Trades</p>
                                    </Link>
                                </div>
                                <div className='flex flex-row items-center my-6'>
                                    <Badge className="mr-4" badgeContent={2} color="primary">
                                        <CalendarMonthIcon />
                                    </Badge>
                                    <Link to="/events">
                                        <p className='text-xl text-black'>Events</p>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;
