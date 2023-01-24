const { is_email } = require("../validators/email_password_mobile")
const type_validator = require('../validators/type_validator')
const jwt=require('jsonwebtoken')
const crypto = require('crypto');

let login_schema={
    user_name:{
        required:true,
        type:"String",
        valid:is_email
    },
    password:{
        required:true,
        type:"string",
    }
}
const login_model=(val,token)=>{
    data=JSON.parse(val)
    let key_schema=Object.keys(login_schema)
    let secret_key=data.user_name || "Akil"
    return new Promise((res,rej)=>{
        if (token && jwt.verify(token,secret_key)) {
            rej("You are already login.")
        } 
        for (const el of key_schema) {
            if((login_schema[el].required) && ! data[el]) rej(`${el} is required`)
            if( data[el] && !(type_validator(data[el],login_schema[el].type))) rej(`${el} is Must be the type of ${login_schema[el].type}`)
            if((login_schema[el].required) && (login_schema[el].valid) && ! (login_schema[el].valid(data[el]))) rej(`${el} is not valid`)
        }
        const secret = '1234536478563940849304975937263s';  
        data["password"]= crypto.createHmac('sha256', secret).update(data.password.trim()).digest('hex');
        res(data)  
    })
}

module.exports=login_model