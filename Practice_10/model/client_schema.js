const mongoose= require('mongoose')

const clien_schema= new mongoose.Schema({
    clientId:{
        type:String,
        required:true,
        unique:[true,"Id Already Exists."]
    },
    name:{
        type:String,
        required:true    
    },
    autoApprove:{
        type:Number,
        required:true,
        default:0 
    },
    // created_on:{
    //     type:Date,
    //     required:true,
    //     default:Date.now
    // },
    appDesc:{
        type:String,
        required:true 
    },
    appWeb:{
        type:String,
        required:true 
    },
    is_access:{
        type:Boolean,
        required:true,
        default:true
    } 
},{ timestamps: { createdAt: 'created_at' } })

module.exports=mongoose.model('Client',clien_schema)