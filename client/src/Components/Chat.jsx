import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {useLocation} from 'react-router-dom'
import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages.'
import TextContainer from './TextContainer';

let socket;
let ENDPOINT = 'ws://localhost:5000';

const Chat = () => {

    let {state} = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('');
    
    
    useEffect(()=> {
      
       setName(state.name)
       setRoom(state.room)

       socket = io(ENDPOINT,{reconnectionDelayMax: 10000,});
       console.log(socket)

       socket.emit("join",{name: state.name, room: state.room},(res)=>{
        console.log(res)
       })

       return () => {
        socket.emit("disconnect");
        socket.off();
       }

    },[state,ENDPOINT]);


    useEffect(()=>{
        socket.on("message",(arg)=>{
            setMessages([...messages, arg])
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
          
    },[messages])


    const sendMessage = (e) => {
        e.preventDefault();

        if(message){
            socket.emit("sendMessage",message,()=>setMessage(''))
        }
    }

    console.log(message,messages)
    return(
       <div className='outerContainer'>
        <div className='container'>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
        <TextContainer users={users}/>
       </div>
    )
}

export default Chat;