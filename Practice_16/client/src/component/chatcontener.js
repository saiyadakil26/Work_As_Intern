// import Header from "./header" 
import{useEffect, useRef, useState} from 'react'
import axios from "axios"
import socket from './socket'
import {json, useNavigate} from 'react-router-dom'

const Chatcontener=()=>{
    //   (()=>{
    //     socket.emit('add-user',JSON.parse(localStorage.getItem('user'))[0]._id)
    // })()
    const [msg,setmsg]=useState()
    const [active,setactive]=useState('Global')
    const [ group_title,set_groptitle]=useState()
    const [ group_member,set_gropmember]=useState([])
    const [arr,setarr]=useState([])
    const [Group,setGroup]=useState([])
    const [Groupactive,setGroupactive]=useState([])
    const [arr_msg,setarr_msg] =useState(null)
    const [is_friend,setis_friend]=useState(false)
    const [is_global,setis_global]=useState(true)
    const [friend1,setfriend1]=useState([])
    const [chat,setchat]=useState([])

    const navigate=useNavigate()


        useEffect(()=>{
            let data={owner:JSON.parse(localStorage.getItem('user'))[0]._id}
            axios.get('/api/alluser').then((res)=>{
                setfriend1(res.data);
            })
            axios.post('/api/group',data).then((res)=>{
                setGroup(res.data.msg)
            })

            //one time refresh bug.

             socket.emit('add-user',data.owner)

        },[])

        const clicked_render= async(data)=>{

            let ren= data._id
            setactive(data.email)
            setis_friend(true)

            if (arr.length !=0) {
                const data={
                    from:JSON.parse(localStorage.getItem('user'))[0]._id,
                    data_msg:arr,
                    to:localStorage.getItem('to')
                }
                let res= await axios.post('/api/chat',data)
            }

            if (ren !== localStorage.getItem('to')) {
                let data={from:JSON.parse(localStorage.getItem('user'))[0]._id,to:ren}
                axios.post('/api/chat_view',data).then((res)=>{
                    setarr(res.data.msg[0].chat);
                })    
                localStorage.setItem('to',ren)  
            }
          
        }

        const on_group=async(room)=>{
            socket.emit('join_room',room._id)
            setactive(room.name)
            localStorage.setItem('group',room._id)
            setis_friend(false)
            setis_global(false)
            if (Groupactive.length !=0 ) {
                console.log(Groupactive);
                await axios.post('/api/group_set_chat',{id:Groupactive,chat:arr})
            }
            setGroupactive(room._id)
            setarr([])
            await axios.post('/api/group_chat',{id:room._id}).then((res)=>{
                setarr(res.data.msg);
            })
            
        }

        const set_glob=()=>{
            setis_global(true)
            setactive('Global')
            setarr([])
        }

        const logout=(e)=>{
            socket.disconnect()
            e.preventDefault()
            localStorage.clear()
            navigate('/')
        }

        const friend=friend1.filter((el)=>el._id !== JSON.parse(localStorage.getItem('user'))[0]._id)

    const send_msg=(e)=>{
        e.preventDefault()
        if(e.keyCode === 13 ){ 
            if (is_friend) {
                socket.emit("send-msg",{to:localStorage.getItem('to'),msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            else if( ! is_global){
                socket.emit("group-msg",{room:Groupactive,msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            else{
                socket.emit("global-msg",{msg,from:JSON.parse(localStorage.getItem('user'))[0]._id})
            }
            setarr((pre)=>[{msg,from:JSON.parse(localStorage.getItem('user'))[0]._id},...pre]);
            e.target.value=""
        } 
    }

    const create_group=(e)=>{
        e.preventDefault()
        let name=""
        while (name == "") {
            name=prompt('Enter Group Name')   
            set_groptitle(name)
        } 
        if(name) document.getElementById('box').classList.remove('hidden')
    }
    const add_member=(e,email)=>{
        e.preventDefault()
        e.target.hidden=true
        let arr=group_member
        arr.push(email)
        // e.target.addclass('disable')
        set_gropmember(arr)
    }
    const generate_group=async(e)=>{
        e.preventDefault()
        let owner=JSON.parse(localStorage.getItem('user'))[0]._id
        const data={
            name:group_title,
            member:[owner,...group_member],
            chat:[],
            owner
        }
        await axios.post('/api/addgroup',data)
        navigate('/')
        document.getElementById('box').classList.add('hidden')
    }
    const delete_group=async(e,id)=>{
        e.preventDefault()
       let res= await axios.post('/api/deletegroup',{id})
       navigate('/')
    }
    // if (socket) {
    //     socket.on("message",(data)=>{
    //         console.log(data);
    //         setarr_msg(data.msg)
    //     })
    // }
    useEffect(()=>{ 
         if (socket) {
            socket.on("msg-recieve",(data)=>{
                if (data.from === localStorage.getItem('to')) {
                    setarr([{msg:data.msg,from:data.from},...arr]);
                }else{
                    //stor it
                }
            })
            socket.on("msg-group",(data)=>{
                if (data.room === localStorage.getItem('group')) {
                    setarr([{msg:data.msg,from:data.from},...arr]);
                }
                
            })
            socket.on("message",(data)=>{
               setarr_msg(data.msg)
                setarr([{msg:data.msg,from:data.from},...arr]);
            })
         }
    },[arr])

    useEffect(()=>{
        if (arr.length !==0) {
            // setarr((pre)=>[{msg:arr_msg,send:false},...pre]);
        }
    },[arr_msg])

    // const arr=[{msg:"Hello",send:false},{msg:"Hello Akil",send:true},{msg:"How are you",send:true}].reverse()
return(
    <div className=" flex flex-row h-[100vh] bg-slate-700">

<div id="box" className='bg-white w-full h-[100vh] hidden'>
    <h1 className=' bg-black text-white mx-auto p-2 '>Group :  {group_title}   (Add Member)</h1>
    {friend.map((el,i)=>{
        return(
            <div key={i} className="flex items-center">
                <p className=' font-bold'>{i+1}. {el.email}</p>
                <button onClick={(e)=>{add_member(e,el._id)}} className='bg-green-500  p-2 m-2 text-white rounded-xl cursor-pointer' >Add</button>
            </div>
        )
    })}
    <button onClick={(e)=>generate_group(e)} className='bg-blue-500 text-white p-2 m-2 rounded-md'> Create Now </button>
</div>

<div className="md:w-[400px]">
           <div className=" bg-slate-500 w-full h-[100vh] p-1">
            <div className="flex justify-center">
                <img alt="logo" className=" w-[70px] mt-5 md:mt-10 md:w-[80px] rounded-tl-xl rounded-br-xl" src="https://www.socialpilot.co/wp-content/uploads/2021/07/1_SocialPilot20logo.png"></img>
            </div>
            <hr className="bg-white h-1 mt-5"/> 
           <button onClick={(e)=>create_group(e)} className='bg-green-500 p-2 m-2 text-white rounded-md'>Create Group</button>
            <hr className="bg-white h-1 mt-5"/> 
            <div className=" overflow-scroll h-[60%]">
            <p className="text-md text-white mt-1 font-semibold"> Direct Message </p> 
            {friend.map((el,i)=>{
                return(
                    <div key={i} onClick={()=>{clicked_render(el)}} className="w-[100%] h-[50px] p-[5px] hover:bg-white cursor-pointer flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{el.email}</p>
                    </div>
                )
            })}
            <hr className="bg-white h-1 mt-5"/> 
            <p className="text-md text-white mt-1 font-semibold"> Group Message </p>  
            {Group.map((el,i)=>{
                return(
                    <div key={i} onClick={()=>{on_group(el)}}  className="w-[100%] h-[50px] p-[5px] hover:bg-white cursor-pointer flex flex-row items-center">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{el.name}</p>
                    {el.owner == JSON.parse(localStorage.getItem('user'))[0]._id ?<button onClick={(e)=>{delete_group(e,el._id)}} className='bg-red-500 p-2 m-2 text-white rounded-lg'>Delete</button> :"" }
                    </div>
                )
            })}
            <hr className="bg-white h-1 mt-5"/> 
            <p className="text-md text-white mt-1 font-semibold bg-green-500 p-5 cursor-pointer" onClick={()=>set_glob()}> Global Message </p>
            </div>
            <div className="w-[100%] h-[50px] p-[5px] flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{JSON.parse(localStorage.getItem('user'))[0].email}</p>
                    <button className=' bg-red-600 w-[80px] h-[40px] ml-2 rounded-md text-white' onClick={(e)=>logout(e)}>Logout</button>
            </div>
           </div>
           
        </div>

    <div className="w-[100%]" >

        <div className="w-[100%] h-[70px] bg-black opacity-60  fixed top-0 text-white flex items-center">
        <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] ml-2 "></div>
           <p className=' font-bold h-full p-5 w-[100%]'>{active}</p>
        </div>

        <div className="min-w-[100%]  h-[100vh] bg-blue-400 flex flex-col-reverse overflow-y-scroll pb-20">
        {
                arr.map((el,i)=>{
                return(
                    <div key={i}>
                { el.from === JSON.parse(localStorage.getItem('user'))[0]._id ?
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