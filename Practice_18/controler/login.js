const response_send = require("../config/response")
const login_query=require('../query/user').find
const crypto =require('crypto')
const { generate_token } = require("../validator/generate_token")
require('dotenv').config()

const controler_login = async (ctx,next) => {
    let data=ctx.request.body
    const secret = process.env.secret;  
    data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password
    
    try {

        let {email,password}=data
        let user_data=await login_query({email,password})
        if(user_data.length === 1 ){
            let {email,user_type}=user_data[0]
            if (user_type!="owner") {
                let [role]=user_data[0].role.filter((el)=>{if (el.email==data.account) return el})
                user_type=role.type
                if (role.type=="cs") {
                    let token = await generate_token(ctx,{email,user_type,permission:role.is_permited})
                    response_send(ctx,200,{msg:"Login succsessfuly",token})
                    return 
                }
            }
            const token = await generate_token(ctx,{email,user_type})
            response_send(ctx,200,{msg:"Login succsessfuly",token})
        }
        else response_send(ctx,200,{error:"Invalid Credential"})

    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}
module.exports={controler_login}