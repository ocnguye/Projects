import { UserButton } from "@clerk/clerk-react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { useQuery } from "@tanstack/react-query";
import Collection from './collections';
import { getProfile } from "../../api/profile";
import { useAuth } from "@clerk/clerk-react";


const Profile = () => { 
    const { getToken } = useAuth();

    const { data, isLoading, isError }: any = useQuery({
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
        <div style={{ height: 500, width: "100%", backgroundColor: "#dff0d8",}}>
            <UserButton />
            { !isLoading && !isError ? (
                <>
                    <h1>{data.username}({data.raters})</h1>
                    {getStars(data.rating)}
                    <Collection/>
                </>
                ) 
                : 
                (<></>)}
            
        </div>
    );
};

export default Profile;
