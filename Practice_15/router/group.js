
// !-- group Router

const koa_rout = require('koa-router')
const {add_group,view_group} = require('../controler/group')
const auth = require('../middleware/authentication')
const is_owner = require('../middleware/is_owner')
const model_group = require('../model/group')
const router=new koa_rout()

router.get('/group',(ctx)=>{  // handle get request
    ctx.body="group Page"
})

router.get('/viewgroup',(ctx)=>{  // handle get request
    ctx.body="group view Page"
})

router.post('/viewgroup',auth,view_group)

router.post('/group',auth,is_owner,model_group,add_group)

module.exports=router 