// should render the chats that a person has or is in
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { getChat } from '../../api/api';
import { Listing } from '../../api/search';

type Time = {
    nanoseconds: number;
    seconds: number;
};

type Contact = {
    id: number;
    other: string;
    created_at: Time;
    listing: Listing; // not actually a listing, has limited user data (ie: Listing.user)
    unread: boolean;
}

const Messages = () => {
    const { userId } = useAuth();
    const { getToken } = useAuth();

    const { data, isLoading, isError } = useQuery<Contact[]>({
        queryKey: ['contacts'],
        queryFn: async () => {
            const token = await getToken(); 
            const resp = await getChat(`contacts/`, token);
            return resp!.data;
        },
    });

    const navigate = useNavigate();
    return (
        <div>
            <h1 className='text-2xl'>Messages</h1>
            { !isLoading && !isError && data ? 
                (<div>
                    {data?.map((contact: Contact) => (
                        <div key={contact.id} className='bg-gray-200 p-4 rounded-md'
                        onClick={() => navigate(`/messages/${contact.id}`, { state: {self: userId, other: contact.other, id: contact.id} })}
                        >
                            <h2>Chat {contact.id}</h2>
                            <p>User: {contact.other}</p>
                            <p>New messages: {contact.unread ? "YES" : "NO"}</p>
                        </div>
                    ))}
                </div>) :
                (<div>
                    <h2>Loading...</h2>
                </div>)
            }
        </div>
    );
}

export default Messages;
