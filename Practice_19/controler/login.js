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

            let user_type="owner"
            let owner=user_data[0]._id
            if (user_data[0].user_type !="owner") {
                let [role]=user_data[0].role.filter((el)=>{if (el.owner_id==data.account) return el})
                user_type=role.type
                owner=role.owner_id
                if (role.type=="cs") {
                    let token = await generate_token(ctx,{id:user_data[0]._id,user_type,permission:role.is_permited,owner})
                    response_send(ctx,200,{msg:"Login succsessfuly",token})
                    return 
                }
            }

            const token = await generate_token(ctx,{id:user_data[0]._id,user_type,owner})
            response_send(ctx,200,{msg:"Login succsessfuly",token})
        }
        else response_send(ctx,200,{error:"Invalid Credential"})

    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}
module.exports={controler_login}