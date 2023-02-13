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
        required:true
    },
    owned_by:{
        type:"string",
        required:true
    },
    like_by:{
        type:"array",
        required:true,
        default:[]
    }
}

module.exports=blog