// should render the chats for a given chatId
//@ts-nocheck
import { send } from 'process';
import { React, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { get, getChat } from '../../api/api';
import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

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

const Chat: React.FC = () => {

    const { getToken, userId } = useAuth();
    const { state } = useLocation();

    const socket = io.connect(chatDomain, { auth: { "self": state.self, "other": state.other, "id": state.id } });
    

    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState(""); // possibly turn into length 2 array [text, "me" or "other"]?
    const [room, setRoom] = useState("");
    const { id } = useParams();

    const joinRoom = () => {
        if (room !== "") 
        {
            socket.emit("join_room", room);
        }
    }

    const sendMessage = () => {
        const newMessage = { text: messageText, isOutgoing: true, room: room };
        socket.emit("send_msg", { messageText, room });
        setMessageText("");
    };
    
    const receiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    useEffect(() => {
        socket.on("receive_msg", receiveMessage);

        return () => {
            socket.off("receive_msg", receiveMessage);
            setMessages([]);
        };
    }, []);

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

    return (
        <div className = "bg-yellow-200 w-96 h-[90svh] flex flex-col">
            {/* Top border with username and buttons */}
            <div className="flex-grow overflow-auto">
                <div className="bg-gray-200 w-full flex flex-row items-center text-black justify-between">
                    <button className="text-m bg-transparent"> &lt; Back </button>
                    <h2 className="text-xl"> Dr. Epstein </h2>
                    <button className="text-m bg-transparent"> Requests </button>
                </div>

                {/* Main chat area with messages */}
                { !isLoading && !isError ? (
                <div className="messages flex flex-col">
                    {messages.map((message, index) => (
                        <div key={index} className={`message m-2 p-2 rounded inline-block max-w-xs break-words ${message.sender === userId ? 'self-end bg-green-150' : 'self-start bg-gray-200 '}`}>
                            {message.text}
                        </div>
                    ))}
                </div> ) : (
                    <div>
                        <h2>Loading...</h2>
                    </div>
                )}

            </div>

            <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center">
                    <input 
                        placeholder='Type a message...' 
                        value = {messageText}
                        onChange={(event) => {setMessageText(event.target.value)}} 
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && messageText !== "") {
                                sendMessage();
                                event.preventDefault(); 
                            }
                        }}
                        className="flex-grow bg-gray-200 p-2 rounded-lg rounded-r-none"
                    />
                    {
                        messageText !== "" ?
                        <button onClick={sendMessage} className="bg-green-150 p-2 rounded-lg rounded-l-none hover:bg-green-250 active:bg-green-350 "> Send </button>
                        :
                        <button className="bg-gray-100 p-2 rounded-lg rounded-l-none "> Send </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Chat;