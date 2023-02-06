import {useState} from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import "react-toastify/ReactToastify.min.css";

const Signup =()=>{
    const [username,setusername]=useState()
    const [Password,setPassword]=useState()
    const [mobile,setmobile]=useState()
    const [preloader,setpreloader]=useState(false)
    const navigate = useNavigate();

    const register_user=async (e)=>{
        e.preventDefault()
        let data={
            "email":username,
            "password":Password,
            "mobile_no":mobile
        }
        try {     
            let res=await axios.post('/api/signup',data)
            toast("User Register Succsessfuly",{type:"success"})
            setpreloader(true)
            setTimeout(()=>{
                localStorage.setItem('user',res.data.token)
                navigate('/');
            },2000)
        } catch (error) {
            let err=error.response.data['error']
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
                   <h1 className="text-2xl my-10 font-bold">Signup Form</h1> 
                   </div>
                   <form>
                        <input onChange={(e)=>setusername(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="E-mail / Username" required/>
                        <input onChange={(e)=>setPassword(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="Password" required/>
                        <input onChange={(e)=>setmobile(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 m-[10%]" placeholder="Mobile Number"/>
                        <button onClick={register_user} className=" bg-blue-500 p-2 w-[80%] mx-[10%] rounded-lg text-white text-xl">Register</button>
                   </form>
            </div>
            </div>: 
             <img alt="preloader" className="mx-auto mt-[50%] md:mt-[15%]" src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"/>
        }
        <ToastContainer position="bottom-right" newestOnTop />
        </>
    )
}

export default Signup