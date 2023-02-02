const db_Connection=require('../db/connection')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config()
  
const signup_user = (val,DataBase="mytest",collection="user")=>{
    return new Promise(async(res,rej)=>{
        try {
            const conn= await db_Connection()
            let db = conn.db(DataBase).collection(collection)
            const token = jwt.sign({email:val.email,user_type:val.user_type},val.email)
            await db.insertOne(val)
            res(token) 
        } catch (err) {
            rej("Sorry Something Went wrong ",err)
        }
    })
}

const invite_user =async(val,data)=>{
    return new Promise((res,rej)=>{
        const user_data=jwt.decode(val)
        data=JSON.parse(data)
        if (user_data.user_type == "owner" && data.user_type != "owner"){
            const token=jwt.sign({owner_id:user_data.email,user_email:data.email,user_type:data.user_type},data.email)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                type: 'OAuth2',
                user: process.env.email,
                pass: process.env.password,
                clientId: process.env.client_id,
                clientSecret: process.env.client_secret,
                refreshToken: process.env.refresh_token
                }
            });
            const mail = {
                from: 'saiyadakil26@gmail.com',
                to: data.email,
                subject: `You are Invited At SocialPilot By ${user_data.email}`,
                text: `You are Invited at SocialPilot click on given link to join us
                    http://localhost:3000/signup?id=${token}`
            };
            transporter.sendMail(mail,(err,info)=>{
                if (err) rej(err.toString()) 
                else res()
            })  
        }
    })
}

module.exports={signup_user,invite_user}