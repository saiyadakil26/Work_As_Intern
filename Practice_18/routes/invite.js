const router = require('./koa')
const auth = require('../middleware/authentication')
const is_owner=require('../middleware/is_owner')
const {invite_user,update_role}=require('../controler/invite_user')
const {model_invite} = require('../model/invite')
const is_invited = require('../middleware/is_invited')

router.get('/invite',(ctx)=>{  // handle get request
    ctx.body="invite Page"
})

router.post('/invite',auth,is_owner,model_invite,invite_user) // post request 

router.post('/updaterole',auth,is_owner,model_invite,is_invited,update_role) 

module.exports=router 