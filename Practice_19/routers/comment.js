const router = require('./koa')
const auth = require('../middleware/authentication')
const has_permission = require('../middleware/has_pemission')
const { post_comment, update_comment, delete_comment } = require('../controler/comment')
const { comment_model, update_comment_model } = require('../model/comment')
const compose = require('koa-compose')

let check_acsess=compose([auth,has_permission("o","a","m")])

router.post('/comment',auth,comment_model,post_comment)
router.put('/comment',check_acsess,update_comment_model,update_comment)
router.delete('/comment',check_acsess,update_comment_model,delete_comment)


module.exports=router 