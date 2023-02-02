const schema=require('../Schema/signup')
const {is_email,is_strong_pass,is_mobile}=require('../validator/email_password_mobile')
const type_validator=require('../validator/type_validator')
const find_uniq=require('../validator/find_uniq')
const response_send = require('../config/response')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const model_signup= async (ctx,next)=>{
    
    let schema_field = Object.keys(schema) // get  schema fields
    let data=ctx.request.body // get request body
    let err={} // error message

    let invited=ctx.request.query.id
    
    if (invited) {
        let secret = process.env.secret
        let invited_data= jwt.verify(invited,secret)
        data["email"]=invited_data.email
        data["user_type"]=invited_data.user_type
        data["owner_id"]=invited_data.owner_email
    }

    try {

        // !---------------------------------- loop over field to validate schema (start)

        for (const el of schema_field) { 
            
            let temp_msg=[] // temporary error message 

            // to trim all string field and convert to lowercase escape password
            if (data[el] && typeof data[el]=="string" && el!='password') data[el]=data[el].trim().toLowerCase()
            
            // set default value if its not given and define in schema
            if (schema[el].default && ! data[el]) data[el] = schema[el].default
    
            // check value with in option 
            if (schema[el].option && ! (schema[el].option?.includes(data[el]))) temp_msg.push(`${data[el]} is Invalid ${el}`)
            
            //check for the required fields
            if((schema[el].required) && ! data[el]) temp_msg.push(`${el} is required`)
            
            // check the data type of fields
            if( data[el] && !(type_validator(data[el],schema[el].type))) temp_msg.push(`${el} is Must be the type of ${schema[el].type}`)
            
            // validate with custome function 
            if(data[el] && (schema[el].valid) && ! (eval(schema[el].valid)(data[el]))) temp_msg.push(`${el} is not valid`)
           
            // check for the uniq value 
            if ((schema[el].required) && schema[el].uniq && !(await find_uniq(el,data[el]))) temp_msg.push(`${el} is Must be Uniq.`)

            // set temporary error message to main error message if error exist
            if (temp_msg.length != 0) err[el]=temp_msg
        }

        // !---------------------------------- loop over field to validate schema (end)

        if (Object.keys(err).length!=0) { // if we have error in schema validation
            let response_message={
                "error":err,
                "is_Signup":false
            }
            response_send(ctx,403,response_message)
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

module.exports=model_signup