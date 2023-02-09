const router = require('./koa')
const auth = require('../middleware/authentication')
const {invite_user,update_role,delete_user, give_acsess}=require('../controler/invite_user')
const {model_invite,model_delete,model_give_acsess} = require('../model/invite')
const is_invited = require('../middleware/is_invited')
const is_owner_admin = require('../middleware/is_owner_or_admin')

router.get('/invite',(ctx)=>{  // handle get request
    ctx.body="invite Page"
})

router.post('/invite',auth,is_owner_admin,model_invite,invite_user) // post request 

router.put('/updaterole',auth,is_owner_admin,model_invite,is_invited,update_role) 

router.delete('/deleteuser',auth,is_owner_admin,model_delete,is_invited,delete_user) 

router.put('/give_acsess',auth,is_owner_admin,model_delete,is_invited,model_give_acsess,give_acsess) 

module.exports=router 