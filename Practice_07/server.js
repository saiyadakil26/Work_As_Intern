const fs=require('fs')
const koa=require('koa')
const rout=require('koa-router')
const body_parser=require('koa-bodyparser')
const render=require('koa-ejs')

const app= new koa()
const router = new rout()
const Port=8080

app.use(body_parser())

let data=JSON.parse(fs.readFileSync('todo_db.json'))

render(app,{
    root:__dirname+"\\views",
    layout:'layout',
    viewExt:'html'
})

router.get('/',async (ctx)=>{
    ctx.render('index',{"data":data})
})
router.get('/add',(ctx)=>{ctx.render('add')})

router.post('/add',async (ctx)=>{
    let todo={name:ctx.request.body.todo,status:0}
    data.push(todo)
    fs.writeFileSync('todo_db.json',JSON.stringify(data))
    ctx.redirect('/')
})
router.get('/update/:id',async (ctx)=>{
    data[ctx.params.id].status=1
    fs.writeFileSync('todo_db.json',JSON.stringify(data))
    ctx.redirect('/')
})
router.get('/delete/:id',async (ctx)=>{
    data.splice(ctx.params.id,1)
    fs.writeFileSync('todo_db.json',JSON.stringify(data))
    ctx.redirect('/')
})
router.get('/edit/:id',async (ctx)=>{
    ctx.render('/edit',{"data":data[ctx.params.id]})
})
router.post('/edit/:id',async (ctx)=>{
    data[ctx.params.id].name=ctx.request.body.todo
    if (ctx.request.body.option != -1 ) {
        data[ctx.params.id].status=ctx.request.body.option
    }
    await fs.writeFileSync('todo_db.json',JSON.stringify(data))
    ctx.redirect('/')
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(Port,()=>{
    `Application Running on ${Port}`
})