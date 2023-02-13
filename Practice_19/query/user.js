const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('user') //establish connection

const insert_one = async (data)=>{
    return await db.insertOne({...data})
}

const find = async (data) =>{
    return await db.find({...data}).toArray()
}

const add_role= async (data,field,val) =>{
    return await db.updateOne({...data},{$push:{[field]:val}})
}

const update_role_query=async (owner,user,role) =>{
    return await db.updateOne({"role.owner_id":owner,_id:user},{$set:{"role.$.type":role}})
}

const invited_user_db=async(invite,owner)=>{
    return await db.countDocuments({$and:[{email:invite},{"role.owner_id":owner}]})
}

const give_accsess_by_id=async(cond,value)=>{
    return await db.updateOne({...cond},{$set:{"role.$.is_permited":value}})
}

const count_user=async (data) =>{
    return await db.countDocuments({...data})
}

const delete_role_by_id = async (field,owner) =>{
    return await db.updateOne({_id:field,"role.owner_id":owner},{$pull:{"role":{owner_id:owner}}})
}

const delete_user_by_id =async(data)=>{
    return await db.deleteOne({...data})
}

module.exports={insert_one,
    find,
    add_role,
    count_user,
    invited_user_db,
    update_role_query,
    give_accsess_by_id,
    delete_role_by_id,
    delete_user_by_id
}