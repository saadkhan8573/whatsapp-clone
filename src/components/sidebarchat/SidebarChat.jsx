import React, { useEffect, useState } from 'react'
import './sidebarchat.css'
import { Avatar } from '@material-ui/core'
import db from '../../firebase'
import { NavLink, useParams } from 'react-router-dom'

const SidebarChat = ({ addNewChat, name, id }) => {
    const [seed, setSeed] = useState();
    const [room, setRoom] = useState();
    const [messages,setMessages] = useState();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp",'desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc?.data()))
            ))
        }
    }, [id])

    const { roomId } = useParams();

    const createChat = () => {
        const roomName = prompt("Please Enter Name for chat");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName
            })
        }
        console.log("messages",messages)
        setRoom(roomName);
    }
    return !addNewChat ? (
        <>
            <NavLink to={`/rooms/${id}`}>
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChat_info">
                        <h2>{name}</h2>
                        <p>{
                            messages ? messages[0]?.message : ""
                        }</p>
                    </div>
                </div>
            </NavLink>
        </>
    )
        :
        (
            <>
                <div onClick={createChat} className="sidebarChat">
                    <h1>Add New Chat</h1>
                </div>
            </>
        );
}

export default SidebarChat;