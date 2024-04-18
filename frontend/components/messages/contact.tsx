import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import Avatar from '@mui/material/Avatar';
import { get } from '../../api/api';
import { renderRating } from '../utils/renderRating';
import { Skeleton } from '../utils/Skeleton';
import { useNavigate } from 'react-router-dom';


type ContactProps = {
    otherId: string;
    id: string;
    setSelected: (id: string) => void;
}

type ContactData = {
    username: string;
    profile_img: string;
    rating: number;
    raters: number;
}

const Contact = ({otherId, id, setSelected}: ContactProps) => {
    const { getToken, userId } = useAuth( );
    const navigate = useNavigate( );

    const { data: profile , isLoading, isError } = useQuery<ContactData>({
        queryKey: ['contact', otherId],
        queryFn: async ( ) => {
            const token = await getToken( );
            const resp = await get( `contacts?userId=${otherId}`, token );
            return resp!.data;
        },
    });

    return (
        <div>
            { !isLoading && !isError && profile ? 
                (<div className='w-full bg-yellow-200 p-2 rounded-lg items-center flex flex-row space-x-3'
                    // onClick={() => navigate(`/messages/${id}`, { state: {self: userId, other: otherId, id: id} })}
                    onClick={() => setSelected(id)}
                >
                    <Avatar src={profile.profile_img} sx={{
                        width: 50,
                        height: 50,
                    }}/>
                    <div>
                        <p className='font-bold'>{profile.username}</p>
                        <div className='flex space-x-1 items-center'>
                            <p>{renderRating(profile.rating)}</p>
                            <p>({profile.raters})</p>
                        </div>
                    </div>
                </div>) :
                (
                    <div className='w-full bg-yellow-200 p-2 rounded-lg flex flex-row space-x-3 items-center'>
                        <Skeleton className='pt-2 w-[50px] h-[50px] rounded-[100px] m-[5px]' />
                        <div className='space-y-1'>
                            <Skeleton className='pt-2 w-[200px] h-[20px]' />
                            <div className='flex space-x-1 items-center'>
                                <Skeleton className='pt-2 w-[100px] h-[20px]' />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Contact;