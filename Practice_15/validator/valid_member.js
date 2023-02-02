const { user_by_ownerid } = require('../query/user')

const conn = require('../config/connect').mongodb_client

const is_valid_member = async (members, owner) => {
    try {
         let db = conn.db("mytest").collection("user")
         let list_of_user= await user_by_ownerid(db,owner)
        for (const elm of members) {
            const index = list_of_user.findIndex(el=>JSON.stringify(el)===JSON.stringify({email:elm}))
            if(index === -1 ) return false
        }
        return true
    } catch (error) {
        return false
    }
}
module.exports = is_valid_member