const { is_email } = require("../validators/email_password_mobile")
const type_validator = require('../validators/type_validator')
const jwt =require('jsonwebtoken')
const is_valid_member = require("../validators/valid_member")

let group_schema={
    title:{
        required:true,
        type:"String"
    },
    description:{
        required:false,
        type:"string",
    },
    owner_id:{
        required:true,
        type:"string",
        valid:is_email
    },
    members:{
        required:true,
        type:"array",
        valid:is_valid_member
    }
}
const group_model=(val,token)=>{
    data=JSON.parse(val)
    let key_schema=Object.keys(group_schema)
    return new Promise(async (res,rej)=>{

        if (token) {
            const token_data=jwt.decode(token)
            if(token_data.user_type!="owner") rej("You are not have rights for generate group ")
            data["owner_id"]=token_data.email
        }
        else rej("Please Login First")

        for (const el of key_schema) {
            if((group_schema[el].required) && ! data[el]) rej(`${el} is required`)
            if( data[el] && !(type_validator(data[el],group_schema[el].type))) rej(`${el} is Must be the type of ${group_schema[el].type}`)
            if((group_schema[el].required) && (group_schema[el].valid) && !  (await group_schema[el].valid(data[el],data.owner_id))) rej(`${el} is not valid`)
        }
        res(data)  
    })
}

module.exports=group_model