import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../../contexts/auth.context'
import io from 'socket.io-client';
import chatService from "../../services/chat.service";
import capitalize from "../../utils/capitalize";
import { Link } from "react-router-dom";

const ChatForm = () => {
    const { user, getToken } = useContext(AuthContext)

    const [messages, setMessages] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        if (user) {
            socket.current = io.connect('http://localhost:5005', { transports: ['websocket'], query: { token: getToken() } });

            socket.current.on('chat message', function (msg) {
                chatService
                    .getMessages()
                    .then(({ data }) => setMessages(data.reverse()))
                    .catch(err => console.log(err))
            });
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [user, getToken]);

    const handleSubmit = (event) => {
        const chatInput = document.getElementById('chat');
        const message = chatInput.value
        event.preventDefault();

        chatService
            .createMessage({ message })
            .then(() => chatService.getMessages())
            .then(({ data }) => setMessages(data.reverse()))
            .then(() => {
                chatInput.value = '';
                socket.current.emit('chat message')
            })
            .catch(err => console.log(err))

    };

    return (
        <>
            {user &&
                <div style={{ width: '300px', backgroundColor: 'pink', position: 'fixed', bottom: '0', right: '0' }}>
                    <ul>
                        {messages.map(({ message, owner, _id }) => (
                            <li key={_id}><Link to={owner?._id}>{capitalize(owner?.name)}</Link>{` ${capitalize(message)}`}</li>
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
