import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../../contexts/auth.context'
import io from 'socket.io-client';
import chatService from "../../services/chat.service";

const ChatForm = () => {
    const { user, getToken } = useContext(AuthContext)

    const [messages, setMessages] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        const connectSocket = async () => {
            const token = await getToken();
            if (user) {
                socket.current = io.connect('http://localhost:5005', { transports: ['websocket'], query: { token } });
                socket.current.on('connect', () => {
                    console.log('Connected to server!');
                });

                socket.current.on('disconnect', () => {
                    console.log('Disconnected from server!');
                });

                socket.current.on('chat message', function (msg) {
                    chatService
                        .getMessages()
                        .then(({ data }) => setMessages(data.reverse()))
                        .catch(err => console.log(err))
                });
            } else {
                socket.current.disconnect();
            }
        };

        connectSocket();
    }, [getToken, user]);

    const handleSubmit = (event) => {
        const chatInput = document.getElementById('chat');
        const message = chatInput.value
        event.preventDefault();

        chatService
            .createMessage({ message })
            .then(() => chatService.getMessages())
            .then(({ data }) => setMessages(data.reverse()))
            .catch(err => console.log(err))

        socket.current.emit('chat message', chatInput.value);
        chatInput.value = '';
    };

    return (
        <>
            {user &&
                <div style={{ width: '300px', backgroundColor: 'red', position: 'fixed', bottom: '0', right: '0' }}>
                    <ul>
                        {messages.map(({ message, owner, _id }) => (
                            <li key={_id}><strong>{owner?.name}</strong>{message}</li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className='d-flex'>
                        <input id="chat" />
                        <button type="submit">Send</button>
                    </form>
                </div>
            }
        </>

    );
};

export default ChatForm;
