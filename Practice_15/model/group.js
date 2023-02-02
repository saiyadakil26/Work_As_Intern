const response_send = require('../config/response')
const schema = require('../Schema/group')
const { is_email } = require("../validator/email_password_mobile")
const is_valid_member=require('../validator/valid_member')
const type_validator = require('../validator/type_validator')

const model_group= async (ctx,next)=>{
    let schema_field = Object.keys(schema) // get  schema fields
    let data=ctx.request.body // get request body
    let err={} // error message

    data.owner_id=ctx.state.user_data.email

    for (const el of schema_field) {

        let temp_err=[]

        if (data[el] && typeof data[el]=="string") data[el]=data[el].trim().toLowerCase()

        if((schema[el].required) && ! data[el]) temp_err.push(`${el} is required`)

        if( data[el] && !(type_validator(data[el],schema[el].type))) temp_err.push(`${el} is Must be the type of ${group_schema[el].type}`)
       
        if((schema[el].required) && (schema[el].valid) && !  (await eval(schema[el].valid)(data[el],data.owner_id))) temp_err.push(`${el} is not valid`)

        if (temp_err.length !=0 ) err[el]=temp_err
       
    }

    if (Object.keys(err).length!=0) { // if we have error in schema validation
        response_send(ctx,403,{"error":err})
    } else { 
        ctx.request.body=data
        await next()
    }

}

module.exports=model_group