import { useState } from "react"
import { Button } from "react-bootstrap"
import ChatForm from "../ChatForm/ChatForm"


const Chat = () => {

    const [useChat, setUseChat] = useState(false)


    const handleConnect = () => setUseChat(true)

    return (

        <div style={{ width: '300px', backgroundColor: 'pink', position: 'fixed', bottom: '0', right: '0' }}>
            {
                useChat
                    ? <ChatForm></ChatForm>
                    : <Button onClick={handleConnect}>Connect</Button>
            }
        </div>

    )
}

export default Chat