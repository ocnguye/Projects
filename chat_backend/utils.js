const { initializeApp } = require("firebase/app");
const { doc, setDoc, getDocs, query, orderBy, collection, serverTimestamp, addDoc, getFirestore } = require("firebase/firestore");


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "angel-trading.firebaseapp.com",
  projectId: "angel-trading",
  storageBucket: "angel-trading.appspot.com",
  messagingSenderId: "838244867682",
  appId: "1:838244867682:web:4323e400c9d07a6cf0fb3b",
  measurementId: "G-BW0S1M03WX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);      // reference to firestore


const addMessage = async (userA, userB, message) => {
    const messageRef = collection(db, "users", userA, "contacts", userB, "messages");
    await addDoc(messageRef, {
        message: message.message,
        time_sent: serverTimestamp(),
        sender: message.sender
    }, {merge: true});
};

const createContact = async (sender, receiver, listing, mId=null) => {
    if (key !== null) { 
        const contactsRef = doc(db, "users", sender, "contacts", mId); 
        await setDoc(contactsRef, {name: receiver, created_at: serverTimestamp(), listing: {
            user: {
                user: listing.user.user,
                username: listing.user.username,
                profile_img: listing.user.profile_img,
                rating: listing.user.rating,
                raters: listing.user.raters,
            },
            collectible: {
                product: listing.collectible.product,
                series: listing.collectible.series,
                name: listing.collectible.name,
                image: listing.collectible.image,
                id: listing.collectible.id,
            },
            availabe: listing.available,
            price: listing.price,
            description: listing.description,
            id: listing.id,
            verified: listing.verified,
            unread: false,
        }}, {merge: true});
    } else { 
        const contactsRef = collection(db, "users", sender, "contacts"); 
        const created = await addDoc(contactsRef, {name: receiver, created_at: serverTimestamp(), listing: {
            user: {
                user: listing.user.user,
                username: listing.user.username,
                profile_img: listing.user.profile_img,
                rating: listing.user.rating,
                raters: listing.user.raters,
            },
            collectible: {
                product: listing.collectible.product,
                series: listing.collectible.series,
                name: listing.collectible.name,
                image: listing.collectible.image,
                id: listing.collectible.id,
            },
            availabe: listing.available,
            price: listing.price,
            description: listing.description,
            id: listing.id,
            verified: listing.verified,
            unread: false,
        }}, {merge: true});
        return created.id;
    }
};

const getContacts = async (user) => {
    const contactsRef = collection(db, "users", user, "contacts");
    const contactsSnap = await getDocs(contactsRef);
    return contactsSnap.docs;
}

const getMessages = async (userA, mId) => {
    const messagesRef = collection(db, "users", userA, "contacts", mId, "messages");
    const q = query(messagesRef, orderBy("time_sent", "asc"));
    const messagesSnap = await getDocs(q);
    return messagesSnap;
};

const markUnreadStatus = async (receiver, mId, readStatus) => {
    const contactRef = doc(db, "users", receiver, "contacts", mId);
    await setDoc(contactRef, {unread: readStatus}, {merge: true});
}

module.exports = {
    addMessage,
    getContacts,
    createContact,
    getMessages,
    markUnreadStatus,
};

