const mongoose= require('mongoose')

const user_schema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email Already Exists."]
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:false,
    },
    owenerID :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    address:{
        city:{
            type:String,
            required:true,
        },
        pincode:{
            type:String
        }
    },
    role:{
        type:String,
        required:true,
        enum:["admin","team","owner"]
    },
    client_id:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Client"
    }],
    // created_on:{
    //     type:Date,
    //     required:true,
    //     default:Date.now
    // },
    is_Active:{
        type:Boolean,
        required:true,
        default:true
    } 
},{ timestamps: { createdAt: 'created_at' } })

module.exports=mongoose.model('User',user_schema)