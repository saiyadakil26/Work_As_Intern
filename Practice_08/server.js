const ex=require('express')
const axios=require('axios')
const todo_rout=require('./router/todo')

const app=ex()
const Port = process.env.Port || 5000

app.use(ex.json())

app.get('/',async (req,res)=>{
    let data = await axios.get('https://jsonplaceholder.typicode.com/todos')
    res.end(JSON.stringify(data.data))
})

app.use(todo_rout)

app.listen(Port,()=>{
    console.log(`Application is running on ${Port}`);
})