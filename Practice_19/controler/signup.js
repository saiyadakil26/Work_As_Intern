const response_send = require("../config/response");
const uuid= require('uuid')
const {insert_one, find, add_role}=require('../query/user')
const crypto=require('crypto');
const { generate_token } = require("../validator/generate_token");
const { delete_invited } = require("../query/invited_user");

const controler_signup = async (ctx,next)=>{

    let data=ctx.request.body // get data from request body

    const signup=async()=>{
        data["_id"]=uuid.v4()
        data["created_at"]=new Date()

        const secret = process.env.secret;  
        data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password
       
        let {_id,user_type}=data
        const token = await generate_token(ctx,{_id,user_type}) // generate token
        await insert_one (data) //execute query
            //!------------ send Succsess mssage --------------!
        response_send(ctx,200,{ msg:"user signup Succsessfuly",token})
        return
    }

    if (data.owner) {
       let res= await find({email:data.email})
       let is_signup=res[0]?.role.filter((el)=>{if(el.owner_id==data.owner) return el}) || []
       if (res.length==1 && is_signup.length != 1) {
            let role={owner_id:data.owner,type:data.user_type,is_permited:false}
            await delete_invited({owner:data.owner})
           add_role({email:data.email},"role",role)
           response_send(ctx,200,{ msg:"Your Role is Added"})
       }else if(is_signup.length == 1){
        response_send(ctx,200,{ msg:"Your Are Already Signup"})
       }else{
            data["role"]=[{owner_id:data.owner,type:data.user_type,is_permited:false}]
            await delete_invited({owner:data.owner})
            delete(data.owner)
            delete(data.user_type)
            await signup()
            return
       }
    }else{
        await signup()
        return
    }
   
}

module.exports={controler_signup}