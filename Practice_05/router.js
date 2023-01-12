const login = require('./login')
const signup=require('./signup')

const rout=(req,res)=>{

    if( req.url == "/signup" && req.method == 'POST'){
        let post_data=''
        req.on('data',(chunk)=>{
            post_data+=chunk
        })
        req.on('end',()=>{
                signup(post_data).then((data)=>{
                res.writeHead(data.code,data.msg)
                res.end(data.msg)
            })

        })
    }
    else if( req.url == "/login" && req.method == 'POST'){
        let post_data=''
        req.on('data',(chunk)=>{
            post_data+=chunk
        })
        req.on('end',()=>{
                login(post_data).then((data)=>{
                res.writeHead(data.code,data.msg)
                res.end(data.msg)
            })

        })
    }
    else{
        res.writeHead(404,"Page Not Found")
        res.end("Opps Page is Not available")
    }
}

module.exports=rout