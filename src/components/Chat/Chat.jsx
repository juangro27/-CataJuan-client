import { faComment, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Button } from "react-bootstrap"
import { ButtonIcon } from "react-rainbow-components"
import ChatForm from "../ChatForm/ChatForm"


const Chat = () => {



    return (

        <div className="chat-container">
            {
                <ChatForm></ChatForm>

            }
        </div>

    )
}

export default Chat