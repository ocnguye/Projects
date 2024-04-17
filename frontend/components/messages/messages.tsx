// @ts-nocheck
import * as React from 'react';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chat from './chat';
import useWindowDimensions from '../../utils/window';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChat } from '../../api/api';
import { Listing } from '../../api/search';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Skeleton } from '../utils/Skeleton';
import { ScrollArea, ScrollBar } from '../utils/ScrollArea';

export type MessageState = {
    self: string;
    other: string;
    id: string;
    username: string;
}

type Time = {
    nanoseconds: number;
    seconds: number;
};

type Contact = {
    id: string;
    other: string;
    created_at: Time;
    listing: Listing; // not actually a listing, has limited user data (ie: Listing.user)
    unread: boolean;
}

const ContactsBar = ({messageState, setMessageState}: any) => {
    const [open, setOpen] = React.useState(true);
    const { getToken, userId } = useAuth();
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const location = useLocation();
    const queryClient = useQueryClient();

    let { data, isLoading, isError } = useQuery<Contact[]>({
        queryKey: ['contacts'],
        queryFn: async () => {
            const token = await getToken(); 
            const resp = await getChat(`contacts/`, token);
            return resp!.data;
        },
        refetchInterval: 3000,
    });

    React.useEffect(() => {
        if (data && data.length > 0) setMessageState({self: userId, other: data[0].other, id: data[0].id, username: data[0].listing?.user.username});
    }, [data]);

    React.useEffect(() => {
        queryClient.invalidateQueries('contacts');
    }, [location]);

    const limit = (username: string | undefined) => {
        if (!username) return '';
        if (width < 640 && username.length > 10) {
            return username.substring(0, 10) + "...";
        } else if (width < 768 && username.length > 12) {
            return username.substring(0, 12) + "...";
        } else if (width < 1024 && username.length > 15) {
            return username.substring(0, 15) + "...";
        } else if (width < 1280 && username.length > 20) {
            return username.substring(0, 20) + "...";
        } else if (width < 1536 && username.length > 25) {
            return username.substring(0, 25) + "...";
        }
        return username;
    }

    const toggleDrawer = () => {
        setOpen(!open);
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }
        
    function stringAvatar(name: string) {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name[0][0]}`,
        };
    }


    return (
        <div className='bg-gray-200 rounded-tl-lg rounded-bl-lg h-full flex flex-col'>
            <div className=''>
                {
                    open ? (
                        <div
                            onClick={toggleDrawer}
                            className='flex w-full justify-end items-center p-2 h-10'
                        >
                            <ChevronLeftIcon />
                        </div>
                    ) : (

                        <div
                            onClick={toggleDrawer}
                            className='flex w-full justify-center items-center p-2 h-10'
                        >
                            <MenuIcon />
                        </div>

                    )
                }
                <Divider />
            </div>
            <div className='overflow-auto h-full'>
                { !isLoading && !isError && data ? 
                    (
                    <ScrollArea className="w-full rounded-md scroll-p-2">
                        <div className="flex flex-col w-max justify-start items-start">
                            {data?.map((contact: Contact) => (
                            <div key={contact.id} className='bg-gray-200 p-2 rounded-md flex justify-center items-center space-x-2'
                            onClick={() => setMessageState({self: userId, other: contact.other, id: contact.id, username: contact.listing?.user.username})}
                            >
                                {
                                    contact?.listing?.user.profile_img === '' ? (
                                        <Avatar {...stringAvatar(contact.listing?.user.username)} />
                                    ) : (
                                        <Avatar src={contact.listing?.user.profile_img}/>

                                    )
                                }
                                <div className= "flex-col" style={{ display: open ? '' : 'none' }}>
                                    <p>{limit(contact?.listing?.user.username)}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                    ) :
                    (
                        <div className='flex flex-col'>
                        <ScrollArea className="w-full rounded-md scroll-p-2">
                            <div className="">
                                {[1, 2, 3, 4, 5].map((index: number) => (
                                <div key={index} className='bg-gray-200 p-2 rounded-md flex justify-center items-center space-x-3'
                                >
                                    <div className= "flex-col" style={{ display: open ? '' : 'none' }}>
                                        <Skeleton className='pt-2 w-[50px] h-[50px] rounded-[100px]' />
                                    </div>
                                </div>
                                ))}
                            </div>
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default function Messages() {
    const [messageState, setMessageState] = React.useState<MessageState>({self: '', other: '', id: '', username: ''});
    let { height } = useWindowDimensions();
    height = height - 130;

    return (
        <div className='w-full flex flex-row pb-0' style={{height: height}}>
            <div className='max-w-[50%]'>
                <ContactsBar messageState={messageState} setMessageState={setMessageState}/>
            </div>
            <div className="h-full flex-1">
                {
                    messageState.id === '' ? (
                        <div className='flex justify-center items-center h-full'>
                            <h1 className='text-2xl'>Select a chat to message people</h1>
                        </div>
                    ) : 
                    <>
                        <Chat state={messageState} id={messageState.id}/>
                    </>
                }
            </div>
        </div>
    );
}
