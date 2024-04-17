require( "dotenv/config" );
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { addMessage, getContacts, createContact, getMessages, markUnreadStatus } = require('./utils');
const { serverTimestamp } = require("firebase/firestore");


const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const origin = process.env.FRONTEND_ORIGIN; // valid url origin (only frontend)
const io = new Server(server, {
    cors: {
        origin: origin,
    },
});


io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_msg", ({ messageText, room }) => {
        const sender = socket.handshake.auth.self;
        const receiver = socket.handshake.auth.other;
        const id = socket.handshake.auth.id;
        socket.to(room).emit("receive_msg", { text: messageText, sender: sender, time_sent: serverTimestamp()});
        
        addMessage(sender, id, { message: messageText, time_sent: serverTimestamp(), sender: sender });
        addMessage(receiver, id, { message: messageText, time_sent: serverTimestamp(), sender: sender });
        markUnreadStatus(receiver, id, true);
    });
});

app.get(
    "/contacts/", 
    ClerkExpressRequireAuth(),
    (req, res) => {
        try {
            console.log("GET /contacts/")
            const user = req.auth.userId;
            getContacts(user).then(contacts => {
                const resp = contacts.map(doc => {
                    return {
                        id: doc.id,
                        other: doc.data().name,
                        created_at: doc.data().created_at,
                        listing: doc.data().listing,
                        unread: doc.data().unread
                    }
                });
                res.status(200).json(resp);
                return resp;
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
);

app.post(
    "/contacts/:other",
    ClerkExpressRequireAuth(),
    async (req, res) => {
        try {
            console.log("POST /contacts/:other")
            const user = req.auth.userId;
            const listing = req.body;
            listing.user = {
                user: listing.user.user,
                username: listing.user.username,
                profile_img: listing.user.profile_img,
                rating: listing.user.rating,
                raters: listing.user.raters,
            };
            const other = req.params.other;
            const key = await createContact(user, other, listing);
            createContact(other, user, listing, key);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
)

app.get(
    "/messages/:mId",
    ClerkExpressRequireAuth(),
    (req, res) => {
        try {
            console.log("GET /messages/:mId")
            const user = req.auth.userId;
            const mId = req.params.mId;
            markUnreadStatus(user, mId, false);
            getMessages(user, mId).then(messages => {
                const resp = [];
                messages.forEach((doc) => {
                    resp.push( {
                        text: doc.data().message,
                        time_sent: doc.data().time_sent,
                        sender: doc.data().sender,
                    });
                });
                res.status(200).json(resp);
                return resp;
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
)


server.listen(3001, () => {
    console.log("Server is running at http://localhost:3001");
});