require('dotenv').config()
const nodemailer = require('nodemailer')

const send_mail=(subject,text,data)=>{
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
        subject,
        text
    };
    transporter.sendMail(mail,(err,info)=>{
        if (err) return false
        return true
    })  
}

module.exports=send_mail