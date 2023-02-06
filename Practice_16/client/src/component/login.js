import axios from "axios";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/ReactToastify.min.css";

const Home =()=>{
    const [username,setusername]=useState()
    const [password,setPassword]=useState()
    const [preloader,setpreloader]=useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        let token=localStorage.getItem('user')
        if (token) {
             navigate('/home');
        }
    })

    const login= async (e)=>{
        e.preventDefault()
        let data={username,password}
        try {     
            let res=await axios.post('/api/login',data)
            if (!res.data.error) {
                // 
                toast("User Login Succsessfuly",{type:"success"})
                setpreloader(true)
                console.log(res.data);
                setTimeout(()=>{
                    localStorage.setItem('user',res.data.token)
                   navigate('/');
                },2000)
            }
            else  toast(res.data.error,{type:"error"})
        } catch (error) {
            let err=error.response.data['error'] || {}
            Object.values(err).flatMap((el)=>{
                toast("Error : "+el,{type:"error"})
                return 0
            })
        }
    }
   
    return(
        <>
        {!preloader?
            <div className="w-[100%] h-[100vh] bg-slate-700 py-10">
                <div className=" bg-white sm: w-[320px] md:w-[500px] h-[90vh] mx-auto border-black border-2 rounded-lg">
                  <div className=" flex justify-center">
                    <img alt="logo" className="w-[200px]" src="https://www.socialpilot.co/wp-content/uploads/2021/07/1_SocialPilot20logo.png"></img>
                    
                   </div>
                   
                   <input type="email" onChange={(e)=>setusername(e.target.value)} id="username_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="Username" required/>
                   <input type="password" onChange={(e)=>setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="Password" required/>
                   <button  onClick={(e)=>login(e)} className=" bg-blue-500 p-2 w-[80%] mx-[10%] rounded-lg text-white text-xl">Login</button>

                    <hr className=" w-[100%] mt-5 md:mt-10 bg-gray-500"/>
                   <Link to="/signup"> <button className=" bg-green-500 p-2 mt-2 md:mt-5 w-[80%] mx-[10%] rounded-lg text-white text-xl">Signup</button></Link>
                </div>
            </div> : 
             <img alt="preloader" className="mx-auto mt-[50%] md:mt-[15%]" src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"/>
        }
        <ToastContainer position="bottom-right" newestOnTop />
        </>
    )
}

export default Home