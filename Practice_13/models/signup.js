const type_validator = require('../validators/type_validator')
const {is_email,is_mobile,is_strong_pass} =require('../validators/email_password_mobile')
const find_uniq=require('../validators/find_uniq')

const signup_schema={
    email:{
        type:"string",
        uniq:true,
        required:true,
        valid:is_email
    },
    address:{
        type:"string",
        required:false
    },
    user_type:{
        type:"string",
        required:true,
        option:["owner","client","teammet"]
    },
    password:{
        type:"string",
        required:true,
        valid:is_strong_pass
    },
    mobile_no:{
        type:"string",
        required:false,
        length:10,
        valid:is_mobile
    },
    create_on:{
        type:"date",
        required:true,
        default:new Date()
    },
    is_active:{
        type:"boolean",
        required:true,
        default:true
    },
    owner_id:{
        type:"string",
        required:true,
        default:" "
    }
}


const validate_schema = async (data)=>{
    data=JSON.parse(data)
    let key_schema=Object.keys(signup_schema)

    return new Promise(async (res,rej)=>{
        for (const el of key_schema) {
            if (signup_schema[el].default && ! data[el]) data[el] = signup_schema[el].default
            if (signup_schema[el].option && ! (signup_schema[el].option?.includes(data[el]))) rej(`${data[el]} is Invalid ${el}`)
            if((signup_schema[el].required) && ! data[el]) rej(`${el} is required`)
            if( data[el] && !(type_validator(data[el],signup_schema[el].type))) rej(`${el} is Must be the type of ${signup_schema[el].type}`)
            if((signup_schema[el].valid) && ! (signup_schema[el].valid(data[el]))) rej(`${el} is not valid`)
            if (signup_schema[el].uniq && !(await find_uniq(el,data[el]))) rej(`${el} is Must be Uniq.`)
        }
        res(data)
    })
}

module.exports=validate_schema