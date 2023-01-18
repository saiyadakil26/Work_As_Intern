const mongoose= require('mongoose')

const account_schema= new mongoose.Schema({
    account_id:{
        type:String,
        required:true,
    },
    Access_token:[{
        type:String,
        required:true,
    }],
    profileUniqueId:{
        type:String,
        required:false,
        unique:[true,"Id Already Exists."]
    },
    is_active:{
        type:Boolean,
        required:true,
        default:true
    },
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    },
    // created_on:{
    //     type:Date,
    //     required:true,
    //     default:Date.now
    // },
    login_id:[{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    }],
    access_user:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }],
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{ timestamps: { createdAt: 'created_at' } })

module.exports=mongoose.model('Account',account_schema)