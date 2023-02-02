const response_send = require("../config/response")
const conn=require('../config/connect').mongodb_client
const login_query=require('../query/user').find
const crypto =require('crypto')
const { generate_token } = require("../validator/generate_token")
require('dotenv').config()

const controler_login = async (ctx,next) => {
    let data=ctx.request.body

    const secret = process.env.secret;  
    data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password
    
    try {

        let db = conn.db('mytest').collection('user')
        let user_data=await login_query(db,data)
        let {email,user_type}=user_data[0]
        const token = await generate_token(ctx,{email,user_type})

        if(user_data.length === 1 && token) response_send(ctx,200,{msg:"Login succsessfuly",token})
        else if(token)  response_send(ctx,200,{error:"Invalid Credential"})

    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}
module.exports={controler_login}