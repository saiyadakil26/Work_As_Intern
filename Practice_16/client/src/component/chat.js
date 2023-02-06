import Chatcontener from "./chatcontener"
import Header from "./header" 
import socket from './socket'
import {io} from 'socket.io-client'
import { useEffect, useRef, useState } from "react"
const Chat=()=>{
    // const socket = useRef()
    const [user,setuser]=useState()
    useEffect(()=>{
        let id=JSON.parse(localStorage.getItem('user'))[0]._id
        if (id) {
           setuser(id) 
        }
    })
    useEffect(()=>{
            if (user) {     
                // socket.current= io('http://localhost:8000/')
                // socket.emit('add-user',user)   
            }
    },[user])
return(
    <Chatcontener socket={socket}/>
)
}

export default Chat