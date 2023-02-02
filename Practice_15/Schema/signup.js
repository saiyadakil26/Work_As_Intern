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
    user_type:{
        type:"string",
        required:true,
        default:"owner",
        option:["admin","owner","teammet","client"]
    },
    create_at:{
        type:"date",
        required:true,
        default:new Date()
    },
    owner_id:{
        type:"string",
        required:true,
        default:"-"
    },
    is_active:{
        type:"boolean",
        require:true,
        default:true
    }
}

module.exports=signup