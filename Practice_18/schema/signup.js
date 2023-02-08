let signup={
    email:{
        type:"string",
        required:true,
        uniq:true,
        valid:"is_email"
    },
    password:{
        type:"string",
        required:true,
        valid:"is_strong_pass"
    },
    mobile_no:{
        type:"string",
        required:false,
        uniq:true,
        valid:"is_mobile"
    }, 
    create_at:{
        type:"date",
        required:true,
        default:new Date()
    },
    user_type:{
        type:"string",
        require:true,
        default:"owner"
    }
}

module.exports=signup