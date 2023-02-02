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
        valid:"is_email"
    },
    members:{
        required:true,
        type:"array",
        valid:"is_valid_member"
    }
}

module.exports=group_schema