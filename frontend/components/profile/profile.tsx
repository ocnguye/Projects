import { UserButton } from "@clerk/clerk-react"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/profile";
import { useAuth } from "@clerk/clerk-react";
import Divider from "@mui/material/Divider";
import { Listing } from "../../api/search";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { renderRating } from "../utils/renderRating";
import { Avatar } from "@mui/material";

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

const cleanImage = (image: string) => {
    const cdn = "https://d3jvwclgjetaaw.cloudfront.net/";
    image = image.replace("[", "").replace("]", "").replace("'", "").replace("'", "").split(" ")[0].replace(",", "");
    image = cdn + image.split("/")[image.split("/").length - 1];
    return image;
}

const formatSeries = (series: string) => {
    if (series.includes("-")) {
        return series.split("-")[0].toUpperCase()[0] + series.split("-")[0].substring(1) + " " + series.split("-")[1].toUpperCase()[0] + series.split("-")[1].substring(1);
    }
    return series.toUpperCase()[0] + series.substring(1) + " Series";
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

    return (
        <Box sx={{ flexGrow: 1 }} className="bg-green-100 w-screen">
          <UserButton afterSignOutUrl="/" />
          {!isLoading && !isError && data ? (
            <>
              <Grid container spacing={2}>
                <Grid xs={2.5}>
                  <div className={'grid col-start-1 row-start-1 mt-4 ml-4 items-center'}>
                    <img className={"rounded-full h-full col-start-1 row-start-1 hover:opacity-50"} src={data.profile_img} />
                    <div className={"col-start-1 row-start-1 flex justify-center"}>
                      <Avatar src={data.profile_img} sx={{height: "100%", width: "100%"}}/>
                      <EditIcon fontSize='large' />
                    </div>
                  </div>
                </Grid>
                <Grid xs={7}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid xs={12} className='hover:scale-105 ease-in-out duration-300 items-center '>
                      <p className='text-3xl text-black mt-6'>{data.username}</p>
                    </Grid>
                    <Divider />
                    <Grid xs={12} className='relative flex items-center hover:scale-105 ease-in-out duration-300 transform-center'>
                      {renderRating(data.rating)} <p className='ml-2 inline text-xs text-black'> ({data.raters})</p>
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid xs={4} className='flex hover:scale-105 ease-in-out duration-300'>
                        <p className='text-l ml-3 text-black truncate'>{data.bio}</p>

                      </Grid>
                      <Grid xs={8}>
                        <p className='inline text-l text-green-600 hover:text-red-500'>Edit bio</p>

                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid xs={2.5}>
                  <p className='text-s text-black mt-6'> Date Joined: API Call</p>
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 1, mt: 20 }}>
                <Grid xs={12}>
                  <Paper elevation={2} className='bg-white'>
                    <Grid container sx={{ flexGrow: 1 }}>
                      <Grid xs={3}>
                        <p className=' ml-6 text-green-600 text-xl'>COLLECTION</p>
                      </Grid>
                      <Grid xs={6}>
                        <Link to={'/collection'} className='text-green-500 text-l hover:text-red-500'>See all</Link>
                      </Grid>
                      <Grid xs={3}> <p className='text-gray-400 text-l hover:text-red-500 text-right mr-6'>Edit Collection</p></Grid>
                    </Grid>
                    <Grid container sx={{ flexGrow: 1 }}>
                      {
                        !isLoading && !isError && data && data.collection ? (
                          <div className="flex">
                            {data.collection.map((listing: Listing) => (
                              <div key={listing.id} className="w-1/6 p-4">
                                <img src={cleanImage(listing.images)} className="w-50 h-50 object-cover rounded-lg" alt={listing.collectible.name} />
                                <div>{formatSeries(listing.collectible.series)}</div>
                                <div> {listing.collectible.name} </div>

                              </div>

                            ))}
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
