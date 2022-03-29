import React, { useEffect, useState } from 'react'
import './chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons'
import { InsertEmoticon, Mic } from '@material-ui/icons'
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import { useStateValue } from '../stateprovider/StateProvider'
import firebase from 'firebase'

const Chat = () => {
    const [seed, setSeed] = useState();
    const [Input, setInput] = useState("");
    const [displayMessage, setdisplayMessage] = useState([])
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const { roomId } = useParams();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot =>
                setRoomName(snapshot.data()?.name))
        }

        db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()))
        ))
    }, [roomId])

    const submitData = (event) => {
        event.preventDefault();
        // setdisplayMessage((preVal) => [
        //     ...preVal,
        //     Input
        // ]);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: Input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("")

    }

    return (
        <>
            <div className="chat">
                <div className="chat_header">
                    <div className="chat_headerLeft">
                        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                        <div className="chat_headerInfo">
                            <h3>{roomName}</h3>
                            <p>
                            Last seen at{" "}
                            {
                                new Date(
                                    messages[messages.length - 1]?.timestamp?.toDate()
                                ).toUTCString()
                            }
                            </p>
                        </div>
                    </div>
                    <div className="chat_headerRight">
                        <IconButton>
                            <SearchOutlined />
                        </IconButton>
                        <IconButton>
                            <AttachFile />
                        </IconButton>
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </div>
                </div>
                <div className="chat_body" >
                    {messages.map((message, index) => {
                        return (<>
                            <div className={`chat_message ${message.name === user.displayName && "chat_reciever"}`} key={index}>
                                <span className="chat_name">{message.name}</span>
                                <p> {message.message} </p>
                                <span className="chat_timeStamp">
                                    {new Date(message.timestamp?.toDate()).toUTCString()}
                                </span>
                            </div>
                        </>)
                    })}

                </div>
                <div className="chat_footer">
                    <IconButton>
                        <InsertEmoticon />
                    </IconButton>
                    <form onSubmit={submitData}>
                        <input type="text" placeholder="Type a message" value={Input} onChange={(e) => setInput(e.target.value)} />
                        <IconButton>
                            <SendIcon type="submit" />
                        </IconButton>
                    </form>
                    <IconButton>
                        <Mic />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default Chat
