const jwt=require('jsonwebtoken')
const response_send = require('../config/response')
require('dotenv').config()

const generate_token = async(ctx,data)=>{
   const secret=process.env.secret // get secret
    try {
        const token=jwt.sign(data,secret) // generate token
        return token
    } catch (error) {
        response_send(ctx,228,error.toString()) // in case of error send response
    }
}
module.exports={generate_token}