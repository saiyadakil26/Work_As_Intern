const send_mail = require("../common_function/send_mail")
const response_send = require("../config/response")
const { countDocument, find, update_by_email, update_field, find_by_id_invite, find_and_update_role } = require("../query/user")
const { generate_token } = require("../validator/generate_token")

const invite_user=async(ctx,next)=>{

    let {user_data} = ctx.state
    let invited_data= ctx.request.body

    try {

        let is_exist=await find({email:invited_data.username})
        is_exist=is_exist[0]
          
        if(is_exist?.user_type === 'owner'){
            response_send(ctx,400,{error:"You can't Invite Our Owner"})
        }else {
            let is_invited=await find_by_id_invite(user_data.email,invited_data.username)
            if(is_invited.length == 1){
                response_send(ctx,400,{error:"You Are Already Invite This User",
                note:"If you want to Update role click here http://localhost:5000/updaterole"})
            }
            else{
                let tokendata={...invited_data,owner_email:user_data.email}
                let token = await generate_token(ctx,tokendata)
                let subject=`You are Invited At SocialPilot By ${user_data.email}`
                let text= `http://localhost:5000/signup?id=${token}`
                let succsess=await send_mail(subject,text,invited_data)
                if (succsess) {
                    await update_field(user_data.email,"invited_user",invited_data.username)
                    response_send(ctx,200,{msg:"User Invited Succsessfully",invite_link:text})
                }else{
                    response_send(ctx,200,{error:"Error when sendng Mail"})
                }
            }

        }
        
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }
    
}

const update_role = async (ctx,next)=>{
    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    try{
        let res= await find({email:data.username})
        let invited=res[0].role
        let count=0
        invited=invited.filter((el)=>{
            if(el[owner_data.email]){
                count++
                 return el[owner_data.email]=data.user_type
                }
            else return el
        })
        if (count!=0) {
            res=await update_by_email(data.username,{'role':invited})
            response_send(ctx,200,{msg:"Role Updated Succsessfully"})
        }
        else{
            response_send(ctx,200,{msg:"This user is not invite by You"})
        }
        
        
    }catch(err){
        response_send(ctx,200,{error:err.toString()})
    }
}

module.exports={invite_user,update_role}