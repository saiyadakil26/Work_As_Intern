const response_send = require("../config/response");
const {insert_one,countDocument, find, update_by_email}=require('../query/user')
const crypto=require('crypto');
const { generate_token } = require("../validator/generate_token");

const controler_signup = async (ctx,next)=>{

    let data=ctx.request.body // get data from request body

    const signup =async()=>{
        const secret = process.env.secret;  
        data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex'); // has the password
        let {email,user_type}=data
        const token = await generate_token(ctx,{email,user_type}) // generate token
        await insert_one (data) //execute query
        
       
        //!------------ send Succsess mssage --------------!

        let response_message={
            msg:"user signup Succsessfuly",
            token
        }
        response_send(ctx,200,response_message)

        //!------------ -------------------- --------------!
}
    try {
       
        if (data.owner_id) {
            const res= await find({email:data.email})
            const user_role={email:data.owner_id,type:data.user_type}
            if (data.user_type=='cs')user_role["is_permited"]=false

            if(res[0]?.role){
                let is_first= res[0].role.filter((el)=>{ if(el.email==data.owner_id) return el})
                if (is_first.length == 0) {   
                    res[0].role.push(user_role)
                    await update_by_email(res[0].email,{role:res[0].role})
                    response_send(ctx,400,{mag:"You are Role is added"})
                }
                else{
                    response_send(ctx,400,{error:"You are already signup"})
                }
            }else{  
                data["role"]=[user_role]
                delete(data.user_type)
                delete(data.owner_id)
                await signup()
            }
        }
        else{
            data["invited_user"]=[]
           await signup()
        }
        
    } catch (error) {

        // in case of error 
         let response_message={
            msg:error.toString()
        }
        response_send(ctx,200,response_message)

    }
    
}

module.exports={controler_signup}