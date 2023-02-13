const router = require('./koa')
const auth = require('../middleware/authentication')
const is_owner = require('../middleware/is_owner')
const {model_invite,model_delete, model_give_acsess} = require('../model/invite')
const { invite_user, update_role, give_acsess, delete_user } = require('../controler/invite_user')
const is_owner_admin = require('../middleware/is_owner_or_admin')
router.get('/invite',(ctx)=>{  // handle get request
    ctx.body="invite Page"
})

router.post('/invite',auth,is_owner,model_invite,invite_user) // post request 
router.put('/updaterole',auth,is_owner_admin,model_invite,update_role)
router.put('/give_acsess',auth,is_owner_admin,model_delete,model_give_acsess,give_acsess) 
router.delete('/deleteuser',auth,is_owner_admin,model_delete,delete_user)

module.exports=router 