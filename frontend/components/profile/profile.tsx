import { UserButton } from "@clerk/clerk-react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useQuery } from "@tanstack/react-query";
import Collection from './collections';
import { getProfile } from "../../api/profile";
import { useAuth } from "@clerk/clerk-react";
import Wishlist from './wishlist';


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
        <div style={{width: "100%", backgroundColor: "#dff0d8",}} className="h-screen">
            <UserButton afterSignOutUrl = "/" />
            { !isLoading && !isError && data ? (
                <>
                    <h1>{data.username}</h1>
                    {getStars(data.rating)}({data.raters})

                    <div>
                        <p>profile img: {data.profile_img}</p>
                        <img src={data.profile_img} />
                    </div>
                    <div>
                        <p> username: {data.username} </p>
                    </div>
                    <div>
                        <p> bio: {data.bio} </p>
                    </div>

                    <Collection/>
                    <Wishlist/>
                </>
                ) 
                : 
                (<></>)}
                
            
        </div>
    );
};

export default Profile;
