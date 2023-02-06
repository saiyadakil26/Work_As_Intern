const response_send = require("../config/response")
const {conn}=require('../config/connection')
const login_query=require('../query/user').find
const crypto =require('crypto')
const { generate_token } = require("../validator/generate_token")
require('dotenv').config()

const controler_login = async (ctx,next) => {
    let data=ctx.request.body

    const secret = process.env.secret;  
    data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password
    
    try {

        let db = conn.db('chat_app').collection('user')
        let user_data=await login_query(db,data)
        if(user_data.length === 1 ){
            let {email}=user_data[0]
            const token = await generate_token(ctx,{email})
            response_send(ctx,200,{msg:"Login succsessfuly",token:JSON.stringify(user_data)})
        }
        else response_send(ctx,200,{error:"Invalid Credential"})

    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}
module.exports={controler_login}