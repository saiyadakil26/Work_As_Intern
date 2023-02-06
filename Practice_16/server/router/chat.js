
// !-- Chat Router

const koa_rout = require('koa-router')
const {controler_chat,controler_get_chat,controler_get_group}=require('../controler/chat')
const router=new koa_rout()


router.get('/api/chat',(ctx)=>{  // handle get request
    ctx.body="chat Page"
})

router.post('/api/chat',controler_chat) // post request 
router.post('/api/chat_view',controler_get_chat)
router.post('/api/group',controler_get_group)
module.exports=router 