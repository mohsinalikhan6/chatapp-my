import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/FirebaseConfig";


export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([])

    const messagesRef = collection(db, 'messages')

    useEffect(() => {
        const queryMessages = query(messagesRef, where('room', '==', room),
        orderBy('createdAt'));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        });
        return () => unsuscribe()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === '') return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage('');
    }
    return (
        <>
            <div className="App">
                <div>
                    <h1>Welcome to the {room.toUpperCase()}</h1></div>
                <div>
                    {messages.map((messages) =>
                        <div key={messages.id}>
                            <span style={{fontWeight:'bold'}}>
                                {messages.user}
                            </span>
                            <div>
                                {messages.text}
                            </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <input placeholder="'Enter any Message"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <button>
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}