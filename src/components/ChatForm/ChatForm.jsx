import { useState, useEffect } from "react";
import io from 'socket.io-client';

const ChatForm = () => {
    const [message, setMessage] = useState('');
    const socket = io.connect('http://localhost:5005');

    const sendMessage = (event) => {
        event.preventDefault();
        socket.emit('chat message', message);
        setMessage('');
    };

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server!');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server!');
        });
    }, []);

    return (
        <div style={{ width: '200px', height: '400px' }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </ div>
    );
};

export default ChatForm;