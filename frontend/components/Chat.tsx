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
        <div className = "text-red-800">
            <input placeholder='Type a message...' onChange = {(event) => {setMessage(event.target.value)}}/>
            <button onClick = {sendMessage}> Send </button>
            <input placeholder='Type a room number...' onChange = {(event) => {setRoom(event.target.value)}}/>
            <button onClick = {joinRoom}> Join </button>
            <h1> Message: </h1>
            {messageReceived}
        </div>
    );
};

export default Chat;