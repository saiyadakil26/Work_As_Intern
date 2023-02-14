const router = require('./koa')
const auth = require('../middleware/authentication')
const { blog_model,blog_update_model, delete_blog_model, like_model} = require('../model/blog')
const has_permission = require('../middleware/has_pemission')
const { controler_blog, get_all_blog, update_blog, delete_blog, like_dislike } = require('../controler/blog')

const permission = require('../middleware/permission')
const compose = require('koa-compose')

let check_acsess=compose([auth,has_permission("o","a","m")])

router.get('/blog',get_all_blog)
router.post('/blog',check_acsess,blog_model,controler_blog) // post request 
router.put('/blog',check_acsess,blog_update_model,update_blog) 
router.delete('/blog',check_acsess,delete_blog_model,delete_blog) 
router.put('/like',auth,like_model,like_dislike) 

// test.
router.post('/test',permission(["admin","manager","owner"]),get_all_blog)

module.exports=router 