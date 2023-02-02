const response_send = require("../config/response");
const conn=require('../config/connect').mongodb_client
const {insert_one}=require('../query/user')
const crypto=require('crypto');
const { generate_token } = require("../validator/generate_token");
require('dotenv').config()

const controler_signup = async (ctx,next)=>{
    try {
        let data=ctx.request.body // get data from request body

        const secret = process.env.secret;  
        data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password

        let db =conn.db('mytest').collection('user') //establish connection
        
        await insert_one (db,data) //execute query
        
        let {email,user_type}=data
        const token = await generate_token(ctx,{email,user_type}) // generate token
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

module.exports={controler_signup}