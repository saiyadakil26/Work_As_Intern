let comment={
    comment:{
        type:"string",
        required:true,
    },
    comment_by:{
        type:"string",
        required:true,
        valid:"is_email"
    },
    post_id:{
        type:"string",
        required:true,
    }
}

module.exports=comment