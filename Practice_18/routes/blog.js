const router = require('./koa')
const auth = require('../middleware/authentication')

router.get('/blog',(ctx)=>{  // handle get request
    ctx.body="blog Page"
})

router.post('/blog',auth) // post request 

module.exports=router 