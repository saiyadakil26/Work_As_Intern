const schema = require('../schema/blog')
const response_send = require('../config/response')
const {is_email}=require('../validator/email_password_mobile')
const type_validator = require('../validator/type_validator')
const {find}=require('../query/user')
const { ObjectId } = require('mongodb')
const find_blog=require('../query/blog').find

const blog_model= async (ctx,next)=>{

    let data=ctx.request.body

    const creater_data=ctx.state.user_data

    let schema_field = Object.keys(schema) // get  schema fields
    let err={} // error message
    
    data["create_by"]=creater_data.email
    data["owned_by"]=data.account

    let res = await find({email:data.account})
    if (!(res.length == 1 && res[0].user_type == "owner")) {
        response_send(ctx,403,{err:"Invalid Account"})
        return
    }
    if (!(res[0].invited_user.includes(creater_data.email)) && res[0].user_type!="owner") {
        response_send(ctx,403,{err:"You Don't have Access"})
    }
    else{
        try {
            // !---------------------------------- loop over field to validate schema (start)

            for (const el of schema_field) { 
                
                let temp_msg=[] // temporary error message 

                // to trim all string field and convert to lowercase escape password
                if (data[el] && typeof data[el]=="string" && data[el]!='title' && data[el]!='desc') data[el]=data[el].trim().toLowerCase()
                
                // set default value if its not given and define in schema
                if (schema[el].default && ! data[el]) data[el] = schema[el].default
        
                //check for the required fields
                if((schema[el].required) && ! data[el]) temp_msg.push(`${el} is required`)
                
                // validate with custome function 
                if(data[el] && (schema[el].valid) && ! (eval(schema[el].valid)(data[el]))) temp_msg.push(`account is not valid`)
            
                // check the data type of fields
                if( data[el] && !(type_validator(data[el],schema[el].type))) temp_msg.push(`${el} is Must be the type of ${schema[el].type}`)
                
                // set temporary error message to main error message if error exist
                if (temp_msg.length != 0) err[el]=temp_msg
            }

            // !---------------------------------- loop over field to validate schema (end)

            if (Object.keys(err).length!=0) { // if we have error in schema validation
                response_send(ctx,403,{"error":err,"is_Posted":false})
            } else { 
                ctx.request.body=data
                await next()
            }

        } catch (error) {
            //pass response in case of error

            response_message={
                "error":error.toString(),
                "is_Signup":false
            }
            response_send(ctx,403,response_message)
        }
    }

}

const blog_update_model= async (ctx,next)=>{
    let data=ctx.request.body
    const creater_data=ctx.state.user_data
    
    let data_field=Object.keys(data)
    let err={}
    try {
        
        let res=await find_blog({_id:new ObjectId(data.id)},{},{})
        if(res.length !=1){
            response_send(ctx,403,{"error":"Blog Is not available","is_Posted":false})
            return
        }
        else{

            let res1 = await find({email:res[0].owned_by})

            if (!(res1.length == 1)) {
                response_send(ctx,403,{err:"Invalid Account"})
                return
            }
            if (!(res1[0].invited_user.includes(creater_data.email)) && res1[0].user_type!="owner") {
                response_send(ctx,403,{err:"You Don't have Access"})
                return
            }

        }
    for (const el of data_field) {

        let field_schema=schema[el]
        if(field_schema){
            let temp_msg=[] // temporary error message 

            // to trim all string field and convert to lowercase escape password
            if (data[el] && typeof data[el]=="string" && data[el]!='title' && data[el]!='desc') data[el]=data[el].trim().toLowerCase()
            
            // set default value if its not given and define in schema
            if (field_schema.default && ! data[el]) data[el] = field_schema.default

            //check for the required fields
            if((field_schema.required) && ! data[el]) temp_msg.push(`${el} is required`)
            
            // check the data type of fields
            if( data[el] && !(type_validator(data[el],field_schema.type))) temp_msg.push(`${el} is Must be the type of ${schema[el].type}`)

            if (temp_msg.length != 0) err[el]=temp_msg
        }
    }

    if (Object.keys(err).length!=0) { // if we have error in schema validation
        response_send(ctx,403,{"error":err,"is_Updated":false})
    } else { 
        ctx.request.body=data
        await next()
    }  
    } 
    catch (error) {
        response_send(ctx,403,{"error":error.toString(),"is_Posted":false})    
    }
}

const delete_blog_model=async (ctx,next)=>{
    let data=ctx.request.query.id
    const creater_data=ctx.state.user_data

    let res=await find_blog({_id:new ObjectId(data)},{},{})

        if(res.length !=1){
            response_send(ctx,403,{"error":"Blog Is not available","is_Posted":false})
            return
        }
        else{

            let res1 = await find({email:res[0].owned_by})

            if (!(res1.length == 1)) {
                response_send(ctx,403,{err:"Invalid Account"})
                return
            }
            if (!(res1[0].invited_user.includes(creater_data.email)) && res1[0].user_type!="owner") {
                response_send(ctx,403,{err:"You Don't have Access"})
                return
            }

        }
    await next()

}

const like_model=async(ctx,next)=>{
    let data=ctx.request.query.id
    let res=await find_blog({_id:new ObjectId(data)},{},{})

        if(res.length !=1){
            response_send(ctx,403,{"error":"Blog Is not available","is_Posted":false})
            return
        }
    await next()
}

module.exports={blog_model,blog_update_model,delete_blog_model,like_model}