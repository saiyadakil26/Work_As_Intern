const router = require('./koa')
const auth = require('../middleware/authentication')
const { blog_model,blog_update_model, delete_blog_model, like_model} = require('../model/blog')
const has_permission = require('../middleware/has_pemission')
const { controler_blog, get_all_blog, update_blog, delete_blog, like_dislike } = require('../controler/blog')


router.get('/blog',get_all_blog)
router.post('/blog',auth,has_permission,blog_model,controler_blog) // post request 
router.put('/blog',auth,has_permission,blog_update_model,update_blog) 
router.delete('/blog',auth,has_permission,delete_blog_model,delete_blog) 
router.put('/like',auth,like_model,like_dislike) // post request 


module.exports=router 