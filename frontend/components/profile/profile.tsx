import { UserButton } from "@clerk/clerk-react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/profile";
import { useAuth } from "@clerk/clerk-react";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Listing } from "../../api/search";
import {getProfileCollection} from "../../api/pfpcollection";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate, Link} from "react-router-dom";




type ProfileData = {
    bio: string,
    username: string,
    profile_img: string,
    rating: number,
    raters: number,
    collection: Listing[],
    wishlist: any,
    trades: any 
}

const cleanImage = ( image: string ) => {
    const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
    image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
    image = cdn + image.split("/")[image.split("/").length - 1];
    return image;
}

const formatSeries = ( series: string ) => {
    if (series.includes("-")) {
        return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
    }
    return series.toUpperCase()[0] + series.substring(1) + " Series";
}

const Profile = () => { 
    const { getToken } = useAuth();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: async () => {
            const token = await getToken();
            const resp = await getProfile(token);
            return resp!.data;
        } 
    });

    const getStars = (rate: number) => {
        let rating = rate;
        const stars = [];
        

        for (let i = 0; i < 5; i++) {
            if (rating >= 1) {
                stars.push(<StarIcon/>)
                rating--;
            } else if (rating > 0) {
                stars.push(<StarHalfIcon/>)
                rating = 0;
            }
            else {
                stars.push(<StarBorderIcon/>)
            }
        }
        return stars;
    }

    return (
<<<<<<< HEAD
        <div style={{width: "100%", backgroundColor: "#dff0d8",}} className="h-screen">
            <UserButton afterSignOutUrl = "/" />
=======
        <Box sx={{ flexGrow: 1}} className = "bg-green-100 w-screen">
            
>>>>>>> 331b340c8a3bd0a66162fbe8495b2f30d2c8171e
            { !isLoading && !isError && data ? (
                <>

                    <Grid container spacing={2}>
                        <Grid xs = {2.5}>
                            <div className={'grid col-start-1 row-start-1 mt-4 ml-4 items-center'} style={{ width: '18vw', height: '18vw' }}>
                                <img className= {"rounded-full h-full col-start-1 row-start-1 hover:opacity-50"} src={data.profile_img}/>
                                <div className = {"col-start-1 row-start-1 flex justify-center"}>  
                                    <EditIcon fontSize ='large'/>
                                </div>
                            </div>
                        </Grid>
              
                        <Grid xs={7}>
                            <Box sx={{ flexGrow: 1}}>
                            <Grid xs ={12} className = 'hover:scale-105 ease-in-out duration-300 items-center '> 
                                <p className='text-3xl text-black mt-6'>{data.username}</p>
                            </Grid>
                            <Divider />
                            <Grid xs={12} className = 'relative flex items-center hover:scale-105 ease-in-out duration-300 transform-center'>
                                {getStars(data.rating)} <p className = 'ml-2 inline text-xs text-black'> ({data.raters})</p>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid xs={4} className = 'flex hover:scale-105 ease-in-out duration-300'>
                                    <p className='text-l ml-3 text-black truncate'>{data.bio}</p>

                                </Grid>
                                <Grid xs={8}>
                                    <p className='inline text-l text-green-600 hover:text-red-500'>Edit bio</p>

                                </Grid>
                            </Grid>
                            </Box>
                        </Grid>
                            
                            
                        <Grid xs = {2.5}>
                            <p className='text-s text-black mt-6'> Date Joined: API Call</p>
                        </Grid>
                        


                    </Grid>

                    <Box sx={{flexGrow: 1, mt: 20}}>
                        <Grid xs={12}>
                            <Paper elevation={2} className = 'bg-white'>
                                <Grid container sx={{flexGrow: 1}}>
                                    <Grid xs={3}>
                                        <p className =' ml-6 text-green-600 text-xl'>COLLECTION</p>
                                    </Grid>    
                                    <Grid xs ={6}> 
                                        <Link to={'/collection'} className ='text-green-500 text-l hover:text-red-500'>See all</Link>
                                            
                                    </Grid>
                                    <Grid xs = {3}> <p className='text-gray-400 text-l hover:text-red-500 text-right mr-6'>Edit Collection</p></Grid>
                                </Grid>
                                <Grid container sx={{flexGrow: 1}}>
                                    {
                                        !isLoading && !isError && data ? (
                                        <div className = "flex">
                                            {data.collection.map((listing: Listing) => (
                                                <div key={listing.id} className = "w-1/6 p-4">
                                                    <img src={cleanImage(listing.images)} className="w-50 h-50 object-cover rounded-lg" alt = {listing.collectible.name} />
                                                    <div>{formatSeries(listing.collectible.series)}</div>
                                                    <div> {listing.collectible.name} </div>
                                                    
                                                </div>

                                            )) }
                                        </div>
                                        ) : (<> Loading </>)
                                    }
                                </Grid>
                            </Paper>

                        </Grid>

                    </Box>
                    
                </>
                ) 
                : 
                (<></>)}
        </Box>
            
    );
};

export default Profile;


/*  from collections.tsx

<div className = "bg-white h-4/5 w-full"> 
                {
                    !isLoading && !isError && data ? (
                    <div className = "flex">
                        {data.collection.map((listing: Listing) => (
                            <div key={listing.id} className = "w-1/4 p-4">
                                <img src={cleanImage(listing.images)} className="w-50 h-50 object-cover rounded-lg" alt = {listing.collectible.name} />
                                <div>{formatSeries(listing.collectible.series)}</div>
                                <div> {listing.collectible.name} </div>
                                
                            </div>

                        )) }
                    </div>
                    ) : (<> Loading </>)
                }
            </div>*/