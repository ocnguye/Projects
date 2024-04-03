//@ts-nocheck
import React, { useEffect, useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [room, setRoom] = useState("");
    const [socket, setSocket] = useState(null);

useEffect(() => {
    // Make sure `room` is not an empty string and you're using backticks for template literal
    if (room !== "") {
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);
        setSocket(ws);

        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            // handle incoming message
        };

        return () => {
            ws.close();
        };
    }
}, [room]); // Reconnect the WebSocket if the `room` state changes

    const sendMessage = () => {
        if (socket && messageText !== "") {
            const messageData = { message: messageText };
            socket.send(JSON.stringify(messageData));

            setMessages((prevMessages) => [...prevMessages, { text: messageText, isOutgoing: true }]);
            setMessageText("");
        }
    };

    return (
        <div className="bg-yellow-200 w-96 h-screen flex flex-col">
            <div className="flex-grow overflow-auto">
                <div className="bg-gray-200 w-full flex flex-row items-center text-black justify-between">
                    <button className="text-m bg-transparent">&lt; Back</button>
                    <h2 className="text-xl">Dr. Epstein</h2>
                    <button className="text-m bg-transparent">Requests</button>
                </div>

                <div className="messages flex flex-col">
                    {messages.map((message, index) => (
                        <div key={index} className={`message m-2 p-2 rounded inline-block max-w-xs break-words ${message.isOutgoing ? 'self-end bg-green-150' : 'self-start bg-gray-200'}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center">
                    <input
                        placeholder="Type a room number..."
                        value={room}
                        onChange={(event) => setRoom(event.target.value)}
                        className="flex-grow bg-gray-200 p-2 rounded-lg rounded-r-none"
                    />
                    {/* Removed the Join button as room is handled by the useEffect hook */}
                </div>
                <div className="flex items-center">
                    <input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && messageText !== "") {
                                sendMessage();
                                event.preventDefault();
                            }
                        }}
                        className="flex-grow bg-gray-200 p-2 rounded-lg rounded-r-none"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!messageText}
                        className={`p-2 rounded-lg ${messageText ? 'bg-green-150 hover:bg-green-250 active:bg-green-350' : 'bg-gray-100'}`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
