const router = require('./koa')
const auth = require('../middleware/authentication')
const has_permission = require('../middleware/has_pemission')
const { post_comment, update_comment, delete_comment } = require('../controler/comment')
const { comment_model, update_comment_model } = require('../model/comment')


router.post('/comment',auth,comment_model,post_comment)
router.put('/comment',auth,has_permission,update_comment_model,update_comment)
router.delete('/comment',auth,has_permission,update_comment_model,delete_comment)


module.exports=router 