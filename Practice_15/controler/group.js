const response_send = require("../config/response")
const { insert_one,groups_by_member,groups_by_owner } = require("../query/group")
const conn = require('../config/connect').mongodb_client

const add_group = async (ctx,next)=>{
    const data= ctx.request.body
    try {
        const db=conn.db('mytest').collection('group')
        await insert_one(db,data)
        response_send(ctx,200,{msg:"Group Created Succsessfuly"})
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }
}

const view_group = async (ctx,next)=>{
    const data= ctx.state.user_data
    try {
        const db=conn.db('mytest').collection('group')
        let groups;
        if (data.user_type === 'owner') {
            groups = await groups_by_owner(db,data.email)
        }else{
            groups = await groups_by_member(db,data.email)
        }
        response_send(ctx,200,{msg:groups})
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }
}

module.exports= {add_group,view_group}