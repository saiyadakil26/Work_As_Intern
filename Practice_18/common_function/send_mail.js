require('dotenv').config()
const nodemailer = require('nodemailer')

const send_mail= async(subject,text,data)=>{
try {
    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })
    let info = await transporter.sendMail({
      from: "saiyadakil26@gmail.com",
      to: data.username,
      subject,
      html:`You are Invited at SocialPilot Click <a href=${text}>Here</a> To Join Us.`
    })
    return true
} catch (error) {
    return false
}
}

module.exports=send_mail