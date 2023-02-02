
// !-- invite Router

const koa_rout = require('koa-router')
const router=new koa_rout()
const auth = require('../middleware/authentication')
const is_owner=require('../middleware/is_owner')
const {invite_user}=require('../controler/invite_user')
const model_invite = require('../model/invite')

router.get('/invite',(ctx)=>{  // handle get request
    ctx.body="invite Page"
})

router.post('/invite',auth,is_owner,model_invite,invite_user) // post request 

module.exports=router 