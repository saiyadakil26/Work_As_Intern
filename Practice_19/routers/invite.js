const router = require('./koa')
const auth = require('../middleware/authentication')
const {model_invite,model_delete} = require('../model/invite')
const { invite_user, update_role, delete_user } = require('../controler/invite_user')
const has_permission = require('../middleware/has_pemission')
const compose = require('koa-compose')

router.get('/invite',(ctx)=>{  // handle get request
    ctx.body="invite Page"
})

const has_owner_admin=compose([auth,has_permission("o","a")])
const has_owner=compose([auth,has_permission("o")])

router.post('/invite',has_owner,model_invite,invite_user) // post request 
router.put('/updaterole',has_owner_admin,model_invite,update_role)
// router.put('/give_acsess',auth,is_owner_admin,model_delete,model_give_acsess,give_acsess) 
router.delete('/deleteuser',has_owner_admin,model_delete,delete_user)

module.exports=router 