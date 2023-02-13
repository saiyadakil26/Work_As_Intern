let schema=require('../schema/comment')
const type_validator=require('../validator/type_validator')
const response_send=require('../config/response')
const { find_comment } = require('../query/comment')
const { ObjectId } = require('mongodb')
const { find } = require('../query/blog')
const find_user=require('../query/user').find
const uuid=require('uuid')
const comment_model=async(ctx,next)=>{
    let data=ctx.request.body
    const creater_data=ctx.state.user_data

    let schema_field = Object.keys(schema)

    data["_id"]=uuid.v4()
    data['comment']=data['comment'].toString()
    data['comment_by']=creater_data.id
    data["post_id"]=ctx.request.query.id

    let err={} // error message

    try {
        // !---------------------------------- loop over field to validate schema (start)

        for (const el of schema_field) { 
            
            let temp_msg=[] // temporary error message 
 
            // set default value if its not given and define in schema
            if (schema[el].default && ! data[el]) data[el] = schema[el].default
     
            //check for the required fields
            if((schema[el].required) && ! data[el]) temp_msg.push(`${el} is required`)
            
            // check the data type of fields
            if( data[el] && !(type_validator(data[el],schema[el].type))) temp_msg.push(`${el} is Must be the type of ${schema[el].type}`)
            
            // set temporary error message to main error message if error exist
            if (temp_msg.length != 0) err[el]=temp_msg
        }

        // !---------------------------------- loop over field to validate schema (end)

        if (Object.keys(err).length!=0) { // if we have error in schema validation
            let response_message={
                "error":err,
                "is_Posted":false
            }
            response_send(ctx,403,response_message)
        } else { 
            ctx.request.body=data
            await next()
        }
    }catch(err){
        response_send(ctx,403,{error:err.toString()})
    }
}

const update_comment_model=async(ctx,next)=>{
    let data=ctx.request.body
    const creater_data=ctx.state.user_data
    if (!data.id) {
        data["id"]=ctx.request.query.id
    }
    try {
        
        let res=await find_comment({_id:data.id},{},{})
        if(res.length !=1){
            response_send(ctx,403,{"error":"Comment Is not available","is_updated":false})
            return
        }else{
            if (res[0].comment_by==creater_data.id) {
                await next()
                return
            }
            else{
                let res1 = await find({_id:res[0].post_id})
                if (res1[0].owned_by==creater_data.owner) {
                    await next();
                    return
                }else{
                    response_send(ctx,403,{"error":"YOu don't have accsses","is_Posted":false})  
                }
            }
    }
        ctx.request.body=data
    await next()
    } 
    catch (error) {
        response_send(ctx,403,{"error":error.toString(),"is_Posted":false})    
    }
}

module.exports={comment_model,update_comment_model}