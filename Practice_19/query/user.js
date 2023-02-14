const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('user') //establish connection

const insert_one = (data)=> db.insertOne({...data})

const find = (data) =>db.find({...data}).toArray()

const update_query=(con,data)=> db.updateOne({...con},{...data})

const add_role= (data,field,val) => db.updateOne({...data},{$push:{[field]:val}})

const update_role_query= (owner,user,role) => db.updateOne({"role.owner_id":owner,_id:user},{$set:{"role.$.type":role}})

const invited_user_db=(invite,owner)=> db.countDocuments({$and:[{email:invite},{"role.owner_id":owner}]})

const give_accsess_by_id=(cond,value)=> db.updateOne({...cond},{$set:{"role.$.is_permited":value}})

const count_user= (data) => db.countDocuments({...data})

const delete_role_by_id =  (field,owner) => db.updateOne({_id:field,"role.owner_id":owner},{$pull:{"role":{owner_id:owner}}})

const delete_user_by_id =(data)=> db.deleteOne({...data})

module.exports={insert_one,
    find,
    add_role,
    count_user,
    invited_user_db,
    update_role_query,
    give_accsess_by_id,
    delete_role_by_id,
    delete_user_by_id,
    update_query
}