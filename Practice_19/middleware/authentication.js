const jwt=require('jsonwebtoken')
const response_send = require('../config/response')
require('dotenv').config()

const auth = async(ctx,next)=>{
    try {
        let token = ctx.request.header.authorization
        let secret = process.env.secret
        if (token) { 
            let user_data=jwt.verify(token,secret)
            ctx.state.user_data=user_data
            await next()
        } else {
            response_send(ctx,401,{error:"Login first"})
        }
    } catch (error) {
        response_send(ctx,401,{error:error.toString()})
    }
}

module.exports=auth