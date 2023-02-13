// !=== import Schema and validators
const schema = require('../Schema/signup')
const {is_email,is_strong_pass,is_mobile} = require('../validator/email_password_mobile')
const type_validator = require('../validator/type_validator')
const find_uniq = require('../validator/find_uniq')

// !=== import dependencys and response file
const response_send = require('../config/response')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const { find_invited, count_invited_user } = require('../query/invited_user')
const { count_user } = require('../query/user')


const model_signup= async (ctx,next)=>{
    let schema_field = Object.keys(schema) // get  schema fields
    let data=ctx.request.body // get request body
    let err={} // error message

    let invited=ctx.request.query.id
    if (invited) {
        let invited_data= jwt.verify(invited,process.env.secret)
        let obj_data= {email:invited_data.username,
            user_type:invited_data.user_type,
            owner:invited_data.owner
        }
        schema.email.uniq = false
        schema.mobile_no.uniq = false
        data={...obj_data,...data}
        let owner_exist= await count_user({_id:invited_data.owner})
        let invit_db_exist= await count_invited_user(invited_data.username,invited_data.owner)
        if(owner_exist !=1 || invit_db_exist!=1){
            response_send(ctx,403,{"error":"Your Invitation Expire.","is_Signup":false})
            return
        }
    }
    
    try {
        // !---------------------------------- loop over field to validate schema (start)

        for (const el of schema_field) { 
            
            let temp_msg=[] // temporary error message 

            // set default value if its not given and define in schema
            if (schema[el].default && ! data[el]) data[el] = schema[el].default 
            // to trim all string field and convert to lowercase escape password

             if (data[el] && typeof data[el]=="string" && el!='password' && el!='_id') data[el]=data[el].trim().toLowerCase()

            // check value with in option 
            if (schema[el].option && ! (schema[el].option?.includes(data[el]))) temp_msg.push(`${data[el]} is Invalid ${el}`)
            
            //check for the required fields
            if((schema[el].required) && ! data[el]) temp_msg.push(`${el} is required`)
            
            // check the data type of fields
            if( data[el] && el!="_id" && !(type_validator(data[el],schema[el].type))) temp_msg.push(`${el} is Must be the type of ${schema[el].type}`)
            
            // validate with custome function 
            if(data[el] && (schema[el].valid) && ! (eval(schema[el].valid)(data[el]))) temp_msg.push(`${el} is not valid`)
           
            // check for the uniq value 
            if (schema[el] && schema[el].uniq && !(await find_uniq(el,data[el]))) temp_msg.push(`${el} is Must be Uniq.`)

            // set temporary error message to main error message if error exist
            if (temp_msg.length != 0) err[el]=temp_msg
        }

        // !---------------------------------- loop over field to validate schema (end)

        if (Object.keys(err).length!=0) { // if we have error in schema validation
            response_send(ctx,403,{"error":err,"is_Signup":false})
        } else { 
            ctx.request.body=data
            await next()
        }

    } catch (error) {
        //pass response in case of error
        response_send(ctx,403,{"error":error.toString(),"is_Signup":false})
    }

}

module.exports={model_signup}