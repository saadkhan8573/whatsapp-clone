import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './sidebar.css'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from '../sidebarchat/SidebarChat';
import db from '../../firebase';
import userEvent from '@testing-library/user-event';
import { useStateValue } from '../stateprovider/StateProvider';

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        db.collection("rooms").onSnapshot((snapshot) =>
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))))
    }, [])

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar_header">
                    <Avatar src={user?.photoURL} />
                    <div className="sidebar_headerRight">
                        <IconButton>
                            <DonutLargeIcon />
                        </IconButton>
                        <IconButton>
                            <ChatIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    </div>
                </div>
                <div className="sidebar_search">
                    <div className="sidebar_searchcontainer">
                        <SearchOutlined />
                        <input type="text" placeholder="Search or start new chat" />
                    </div>
                </div>
                <div className="sidebar_chats">
                    <SidebarChat addNewChat />
                    {rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
