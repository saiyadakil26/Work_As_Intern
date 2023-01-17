const type_validator = require('./type_validator')
const data_type=require('./type_validator')
const User_schema={
    email:{
        required:true,
        type:"string"
    },
    mobile_number:{
        required:true,
        type:"string"
    },
    password:{
        required:true,
        type:"string"
    },
    age:{
        required:false,
        type:"number" 
    }
}

let data={
    email:"saiyadakil26@gmail.com",
    mobile_number:"9313781574",
    age:"19",
    password:"Akil@345"
}

const valid_data=(data)=>{
    let key_schema=Object.keys(User_schema)
    try {
        key_schema.forEach((el)=>{
            if((User_schema[el].required) && data[el] == undefined) throw new Error(`${el} is required`)
            if(!(type_validator(data[el],User_schema[el].type))) throw new Error(`${el} is Must be the type of ${User_schema[el].type}`)
        })
        return true
    } catch (e) {
        console.log(e.toString());
        return false
    }
}

 console.log(valid_data(data));