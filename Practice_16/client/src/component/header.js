import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const Header=()=>{
    const [friend1,setfriend1]=useState([])
    const navigate=useNavigate()
        useEffect(()=>{
            axios.get('/api/alluser').then((res)=>{
                setfriend1(res.data);
            })
        },[])
        const clicked_render=(ren)=>{
            if (ren !== localStorage.getItem('to')) {    
             localStorage.setItem('to',ren)
            }
        }
        const logout=(e)=>{
            e.preventDefault()
            localStorage.clear()
            navigate('/')
        }
    const friend=friend1.filter((el)=>el._id !== JSON.parse(localStorage.getItem('user'))[0]._id)
    const Group=["Intern","SocialPilot","Developers","Team Ankit"]
    return(
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
                    <div key={i} className="w-[100%] h-[50px] p-[5px] hover:bg-white cursor-pointer flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">{el}</p>
                    </div>
                )
            })}
            </div>
            <div className="w-[100%] h-[50px] p-[5px] flex flex-row">
                    <div className=" rounded-full bg-yellow-400 w-[40px] h-[40px] mx-2 "></div>
                    <p className="font-bold">My Account</p>
                    <button className=' bg-red-600 w-[80px] h-[40px] ml-2 rounded-md text-white' onClick={(e)=>logout(e)}>Logout</button>
            </div>
           </div>
           
        </div>
    )
}

export default Header