
const db_Connection=require('../db/connection')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
  
const signup_user = async (val,DataBase="mytest",collection="user")=>{
    const conn= await db_Connection()
    let db = conn.db(DataBase).collection(collection)
    const token = jwt.sign({email:val.email,user_type:val.user_type},val.email)
    await db.insertOne(val)
    return token
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
                user: 'saiyadakil26@gmail.com',
                pass: '7863861183',
                clientId: '161286714449-g4t8p5ci0qefe2pcfg9g9u5j39u7il96.apps.googleusercontent.com',
                clientSecret: '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',
                refreshToken: "1//04aw4XgGQtK4pCgYIARAAGAQSNwF-L9IraZFBWH-rKUYm-RN2UX-JaOJTuDzE74VJyhCxii-My5KCjjdXq2JZ6ZuKyEyWOdcXOBw"

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
                if (err) rej("Error When sending mail")
                else res()
            })  
        }
    })
}

module.exports={signup_user,invite_user}