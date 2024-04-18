// should render the chats for a given chatId
//@ts-nocheck
import { send } from 'process';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { get, getChat } from '../../api/api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import { MessageState } from './messages';

const chatDomain = import.meta.env.VITE_CHAT_URL;

type Time = {
    nanoseconds: number;
    seconds: number;
};

type Message = {
    sender: string;
    text: string;
    time_sent: Time;
}

type ChatProps = {
    state: MessageState;
    id: string;
}

const Chat: React.FC = ({state, id}: ChatProps) => {

    const { getToken, userId } = useAuth();

    const socket = io.connect(chatDomain, { auth: { "self": state.self, "other": state.other, "id": state.id } });
    

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (room !== "") 
        {
            socket.emit("join_room", room);
        }
    }

    const sendMessage = () => {
        if (messageText === "") return;
        const newMessage = { text: messageText, isOutgoing: true, room: room };
        socket.emit("send_msg", { messageText, room });
        setMessageText("");
    };
    
    const receiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    useEffect(() => {
        setMessages([]);
        socket.on("receive_msg", receiveMessage);

        return () => {
            socket.off("receive_msg", receiveMessage);
            setMessages([]);
        };
    }, [state]);

    const { data, isLoading, isError } = useQuery<Message[]>({
        queryKey: ['messages', id],
        queryFn: async () => {
            const token = await getToken(); 
            const resp = await getChat(`messages/${id}`, token);
            return resp!.data;
        },
    });

    useEffect( () => {
        socket.emit("join_room", id);
        setRoom(id);

    }, [id]);

    useEffect(() => {
        if (!isLoading && !isError) {
            setMessages((prevMessages) => [...data, ...prevMessages]);
        }
    }, [data]);

    const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className = "bg-yellow-200 h-full flex flex-col">
            <div className="bg-gray-200 h-10 p-2 flex flex-row items-center text-black ">
                <h2 className="text-lg">{state.username}</h2>
            </div>
            <Divider />
            <div className="flex-grow overflow-auto">

                { !isLoading && !isError ? (
                <div className="flex flex-col">
                    {messages.map((message, index) => (
                        <div key={index} className={`message m-2 p-2 rounded inline-block max-w-xs break-words ${message.sender === userId ? 'self-end bg-green-150' : 'self-start bg-gray-200 '}`}>
                            {message.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div> ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )}

            </div>

            <div className="flex flex-col">
                <div className="flex items-center">
                    <div className='flex w-full'>
                        <textarea 
                            placeholder='Message...' 
                            rows="1"
                            value = {messageText}
                            onChange={(event) => {setMessageText(event.target.value)}} 
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && messageText !== "" && !event.shiftKey) {
                                    event.preventDefault();
                                    sendMessage();
                                }
                            }}
                            className="bg-gray-200 p-2 rounded-lg m-1"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;