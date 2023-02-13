const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('user') //establish connection

const insert_one = async (data)=>{
    return await db.insertOne({...data})
}
const find = async (data) =>{
    return await db.find({...data}).toArray()
}

const update_field= async (field,update_field,data)=>{
   // console.log(field);
    return await db.updateOne({email:field},{$push:{[update_field]:data}})
}

const countDocument = async (data) =>{
    return await db.countDocuments({...data})
}


const update_by_email = async (field,data) =>{
    return await db.updateOne({email:field},{$set:{...data}})
}

const delete_by_email = async (field,owner) =>{
    return await db.updateOne({email:field,"role.email":owner},{$pull:{"role":{email:owner}}})
}

const update_role_query =async(email,owner,value)=>{
    return await db.updateOne({email:email,"role.email":owner},{$set:{...value}})
}

const find_and_update_role=async(owner,field,value)=>{
    return await db.updateOne({email:owner},{$set:{[field]:value}})
}

const delete_user_by_email =async(data)=>{
    return await db.deleteOne({...data})
}

const give_accsess_by_id=async(cond,value)=>{
    return await db.updateOne({...cond},{$set:{"role.$.is_permited":value}})
}

// const user_by_ownerid=async(data)=>{
//    return await db.find({owner_id: data}).project({_id:0,email:1}).toArray()
// }

module.exports={insert_one,find,
    countDocument,
    update_by_email,
    update_field,
    find_and_update_role,
    update_role_query,
    delete_by_email,
    delete_user_by_email,
    give_accsess_by_id
    // user_by_ownerid
}