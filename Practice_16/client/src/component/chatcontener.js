// import Header from "./header" 
import{useEffect, useRef, useState} from 'react'
// import {io} from 'socket.io-client'
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const Chatcontener=({socket})=>{
    const [msg,setmsg]=useState()
    const [arr,setarr]=useState([])
    const [Group,setGroup]=useState([])
    const [Groupactive,setGroupactive]=useState([])
    const [arr_msg,setarr_msg] =useState()
    const [is_friend,setis_friend]=useState(false)
    const [is_global,setis_global]=useState(true)
    
    const [friend1,setfriend1]=useState([])
    const [chat,setchat]=useState([])
    const navigate=useNavigate()
        useEffect(()=>{
            axios.get('/api/alluser').then((res)=>{
                setfriend1(res.data);
            })
            let data={owner:JSON.parse(localStorage.getItem('user'))[0]._id}
            axios.post('/api/group',data).then((res)=>{
                setGroup(res.data.msg)
                //console.log(res.data.msg);
                //setfriend1(res.data);
            })
        },[])
        const clicked_render= async(ren)=>{
            setis_friend(true)
            if (arr.length !=0) {
                const data={
                    owner:JSON.parse(localStorage.getItem('user'))[0]._id,
                    data_msg:{[localStorage.getItem('to')]:arr},
                    to:localStorage.getItem('to')
                }
                //console.log(data);
                let res= await axios.post('/api/chat',data)
            }
            if (ren !== localStorage.getItem('to')) {
                let data={owner:JSON.parse(localStorage.getItem('user'))[0]._id}
                axios.post('/api/chat_view',data).then((res)=>{
                   setchat(res.data.msg[0].chat)
                })    
             localStorage.setItem('to',ren)
             let new_arr=chat.filter((el)=>{
                if(el[ren]) return el
            })
             setarr(new_arr[0][ren]);
            }
          
        }

        const on_group=(room)=>{
            socket.current.emit('join_room',room)
            setis_friend(false)
            setis_global(false)
            setGroupactive(room)
            setarr([])
        }
        const set_glob=()=>{
            setis_global(true)
            setarr([])
        }
        const logout=(e)=>{
            e.preventDefault()
            localStorage.clear()
            navigate('/')
        }
        const friend=friend1.filter((el)=>el._id !== JSON.parse(localStorage.getItem('user'))[0]._id)
        // const Group=["Intern","SocialPilot","Developers","Team Ankit"]

    // socket.current.emit("send-msg",{to,msg})
    const send_msg=(e)=>{
        e.preventDefault()
        if(e.keyCode === 13 ){ 
            if (is_friend) {
                socket.current.emit("send-msg",{to:localStorage.getItem('to'),msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            else if( ! is_global){
                socket.current.emit("group-msg",{room:Groupactive,msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            else{
                socket.current.emit("global-msg",{msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            setarr((pre)=>[{msg,send:true},...pre]);
            e.target.value=""
        } 
    }

    useEffect(()=>{
        if (socket.current) {
            socket.current.on("msg-recieve",(data)=>{
                if (data.from === localStorage.getItem('to')) {
                    setarr_msg(data.msg)
                }else{
                    //stor it
                }
            })
            socket.current.on("msg-group",(data)=>{
                setarr_msg(data.msg)
            })
            socket.current.on("message",(data)=>{
                setarr_msg(data.msg)
            })
        }
    },[arr])

    useEffect(()=>{
        if (arr.length !==0) {
            setarr((pre)=>[{msg:arr_msg,send:false},...pre]);
        }
    },[arr_msg])

    // const arr=[{msg:"Hello",send:false},{msg:"Hello Akil",send:true},{msg:"How are you",send:true}].reverse()
return(
    <div className=" flex flex-row h-[100vh] bg-slate-700">


<div className="md:w-[400px]">
           <div className=" bg-slate-500 w-full h-[100vh] p-1">
            <div className="flex justify-center">
                <img alt="logo" className=" w-[70px] mt-5 md:mt-10 md:w-[80px] rounded-tl-xl rounded-br-xl" src="https://www.socialpilot.co/wp-content/uploads/2021/07/1_SocialPilot20logo.png"></img>
            </div>
            <hr className="bg-white h-1 mt-5"/> 
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="search here" required/>
            <hr className="bg-white h-1 mt-5"/> 
            <div className=" overflow-scroll h-[60%]">
            <p className="text-md text-white mt-1 font-semibold"> Direct Message </p> 
            {friend.map((el,i)=>{
                return(
                    <div key={i} onClick={()=>{clicked_render(el._id)}} className="w-[100%] h-[50px] p-[5px] hover:bg-white cursor-pointer flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{el.email}</p>
                    </div>
                )
            })}
            <hr className="bg-white h-1 mt-5"/> 
            <p className="text-md text-white mt-1 font-semibold"> Group Message </p>  
            {Group.map((el,i)=>{
                return(
                    <div key={i} onClick={()=>{on_group(el._id)}}  className="w-[100%] h-[50px] p-[5px] hover:bg-white cursor-pointer flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{el.name}</p>
                    </div>
                )
            })}
            <hr className="bg-white h-1 mt-5"/> 
            <p className="text-md text-white mt-1 font-semibold bg-green-500 p-5 cursor-pointer" onClick={()=>set_glob()}> Global Message </p>
            </div>
            <div className="w-[100%] h-[50px] p-[5px] flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">My Account</p>
                    <button className=' bg-red-600 w-[80px] h-[40px] ml-2 rounded-md text-white' onClick={(e)=>logout(e)}>Logout</button>
            </div>
           </div>
           
        </div>

    <div className="w-[100%]" >

        <div className="w-[100%] h-[70px] bg-black opacity-60  fixed top-0">
            
        </div>
        <div className="min-w-[100%]  h-[100vh] bg-blue-400 flex flex-col-reverse overflow-y-scroll pb-20">
        {
                arr.map((el,i)=>{
                return(
                    <div key={i}>
                { el.send ?
                    <p className=" break-words bg-white w-fit p-2 m-2 rounded-b-xl rounded-tr-xl max-w-[180px] md:max-w-[500px]">{el.msg}</p> :
                    <p className="break-words bg-blue-500 w-fit p-2 m-2 rounded-b-xl rounded-tl-xl ml-auto max-w-[180px] md:max-w-[500px]">{el.msg}</p>
                }
                </div>
                )
            })}
    </div>
       

        <div className="w-[90%] h-[70px] bg-blue-400 fixed bottom-0 flex justify-start">
            <input type="text" id="send_msg" defaultValue={msg} onChange={(e)=>setmsg(e.target.value)} onKeyUp={(e)=>send_msg(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-1 m-[1%]" placeholder="Type Message Here" />
        </div>

    </div>

    </div>
)
}

export default Chatcontener