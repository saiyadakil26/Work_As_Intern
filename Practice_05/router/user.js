const { json } = require('stream/consumers')
const user_delete=require('../controler/delete')
const user_view=require('../controler/view')

const user=(req,res,token)=>{
    if (req.method == 'DELETE') {
        user_delete(token).then((data)=>{
            res.writeHead(data.code,data.msg)
            res.end(data.msg)
        })  
    } else if(req.method == 'GET') {
        user_view(token).then((data)=>{
            res.writeHead(data.code,data.msg)
            res.end(JSON.stringify(data.data))
        }) 
    }
}

module.exports=user