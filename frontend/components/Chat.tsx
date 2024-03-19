//@ts-nocheck
import { send } from 'process';
import { React, useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');

const Chat: React.FC = () => {

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_msg", { message });
    };

    useEffect(() => {
        socket.on("receive_msg", (data) => {
            setMessageReceived(data.message);
        })

    }, [socket])

    return (
        <div>
            <input placeholder='Type a message...' onChange = {(event) => {setMessage(event.target.value)}}/>
            <button onClick = {sendMessage}> Send </button>
            <h1> Message: </h1>
            {messageReceived}
        </div>
    );
};

export default Chat;