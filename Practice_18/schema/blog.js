let blog={
    title:{
        type:"string",
        required:true,
    },
    desc:{
        type:"string",
        required:true,
    },
    create_by:{
        type:"string",
        required:true,
        valid:"is_email"
    }, 
    create_at:{
        type:"date",
        required:true,
        default:new Date()
    },
    owned_by:{
        type:"string",
        required:true,
        valid:"is_email"
    },
    like_by:{
        type:"array",
        required:true,
        default:[]
    }
}

module.exports=blog