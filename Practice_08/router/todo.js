const ex=require('express')
const axios=require('axios')

const app=ex()

const url="https://jsonplaceholder.typicode.com/todos"

app.get('/todo/:id',async (req,res)=>{
    let data = await axios.get(`${url}/${req.params.id}`)
    res.end(JSON.stringify(data.data))
})

app.post('/todo',async(req,res)=>{
    let todo=req.body
    let data = await axios.post(url,todo)
    res.end(JSON.stringify(data.data))
})

app.put('/todo/:id',async(req,res)=>{
    try{
        let todo=req.body
        let data = await axios.put(`${url}/${req.params.id}`,todo)
        res.end(JSON.stringify(data.data))
    }catch(e){
        res.end("something Went Wrong"+e.toString())
    }
})

app.delete('/todo/:id',async (req,res)=>{
    let data = await axios.delete(`${url}/${req.params.id}`)
    res.end(JSON.stringify(data.data))
})

module.exports=app