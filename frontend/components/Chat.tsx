//@ts-nocheck
import { send } from 'process';
import { React, useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

const Chat: React.FC = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (room !== "") 
        {
            socket.emit("join_room", room);
        }
    }

    const sendMessage = () => {
        socket.emit("send_msg", { message, room });
    };

    useEffect(() => {
        socket.on("receive_msg", (data) => {
            setMessageReceived(data.message);
        })

    }, [socket])

    return (
        <div className = "bg-yellow-200 w-96 h-screen flex flex-col">
            {/* Top border with username and buttons */}
            <div className="flex-grow overflow-auto">
                <div className="bg-gray-200 w-full flex flex-row items-center text-black justify-between">
                    <button className="text-m bg-transparent"> &lt; Back </button>
                    <h2 className="text-xl"> PookiEpstein </h2>
                    <button className="text-m bg-transparent"> Requests </button>
                </div>

                <p>{messageReceived}</p>
            </div>

            {/* Main chat area with messages */}
            <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center">
                    {/* Temporary room input for testing purposes, will be replaced later */}
                    <input 
                        placeholder='Type a room number...' 
                        onChange={(event) => {setRoom(event.target.value)}} 
                        className="flex-grow bg-gray-200 p-2 rounded-lg rounded-r-none"
                    />
                    <button onClick={joinRoom} className="bg-green-150 p-2 rounded-lg rounded-l-none hover:bg-green-250 active:bg-green-350"> Join </button>
                </div>
                <div className="flex items-center">
                    <input 
                        placeholder='Type a message...' 
                        onChange={(event) => {setMessage(event.target.value)}} 
                        className="flex-grow bg-gray-200 p-2 rounded-lg rounded-r-none"
                    />
                    <button onClick={sendMessage} className="bg-green-150 p-2 rounded-lg rounded-l-none hover:bg-green-250 active:bg-green-350 "> Send </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;