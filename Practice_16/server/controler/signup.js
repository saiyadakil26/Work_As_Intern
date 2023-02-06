const response_send = require("../config/response");
const {conn}=require('../config/connection')
const {insert_one, find}=require('../query/user')
const crypto=require('crypto');
const { generate_token } = require("../validator/generate_token");
require('dotenv').config()

const controler_signup = async (ctx,next)=>{
    try {
        let data=ctx.request.body // get data from request body

        const secret = process.env.secret;  
        data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password

        let db =conn.db('chat_app').collection('user') //establish connection

        let {email}=data
        // const token = await generate_token(ctx,{email}) // generate token

        await insert_one (db,data) //execute query
        const token=data
        
       
        //!------------ send Succsess mssage --------------!

        let response_message={
            msg:"user signup Succsessfuly",
            token
        }
        response_send(ctx,200,response_message)

        //!------------ -------------------- --------------!

    } catch (error) {

        // in case of error 
         let response_message={
            msg:error.toString()
        }
        response_send(ctx,200,response_message)

    }
    
}

const show_user= async (ctx,next)=>{
    let db =conn.db('chat_app').collection('user') //establish connection
    let data= await find(db,{})
    response_send(ctx,200,data)
}

module.exports={controler_signup,show_user}