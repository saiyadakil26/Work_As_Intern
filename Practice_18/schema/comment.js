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
    create_at:{
        type:"date",
        required:true,
        default:new Date()
    },
    post_id:{
        type:"string",
        required:true,
    }
}

module.exports=comment