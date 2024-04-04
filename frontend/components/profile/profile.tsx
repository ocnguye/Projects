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




type ProfileData = {
    bio: string,
    username: string,
    profile_img: string,
    rating: number,
    raters: number,
    collection: any,
    wishlist: any,
    trades: any 
}

const Profile = () => { 
    const { getToken } = useAuth();

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
        <Box sx={{ flexGrow: 1}} className = "bg-green-100 w-screen">
            
            { !isLoading && !isError && data ? (
                <>

                    <Grid container spacing={2}>
                        <Grid xs = {2.5}>
                            <button className={`bg-[url('${data.profile_img}')] rounded-full mt-4 ml-4`} style={{ width: '18vw', height: '18vw' }}>
                            </button>
                        </Grid>
                        <Grid xs={7}>
                            <Box sx={{ flexGrow: 1}}>
                            <Grid xs ={12}> 
                                <p className='text-3xl text-black mt-6'>{data.username}</p>
                            </Grid>
                            <Grid xs={12} className = 'flex items-center'>
                                {getStars(data.rating)} <p className = 'ml-2 inline text-xs text-black'> ({data.raters})</p>
                            </Grid>
                            <Grid container spacing={0}>
                                <Grid xs={4} className = 'flex '>
                                    <p className='text-l ml-3 text-black truncate'>{data.bio}</p>

                                </Grid>
                                <Grid xs={8}>
                                    <p className='ml-2 inline text-l text-green-600 hover:text-red-500'>Edit bio</p>

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
                                        <p className ='text-green-500 text-l hover:text-red-500'>See all</p>
                                    </Grid>
                                    <Grid xs = {3}> <p className='text-gray-400 text-l hover:text-red-500 text-right mr-6'>Edit Collection</p></Grid>
                                </Grid>
                                <Grid container sx={{flexGrow: 1}}>
                                    
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
