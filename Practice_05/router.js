const login = require('./login')
const signup=require('./signup')
const logout=require('./logout')

const rout=(req,res)=>{

    if( req.url == "/signup" && req.method == 'POST'){
        let post_data=''
        req.on('data',(chunk)=>{
            post_data+=chunk
        })
        req.on('end',()=>{
                signup(post_data).then((data)=>{
                res.writeHead(data.code,data.msg)
                if (data.token) res.end(data.msg +" Your Token is := "+data.token)
                else res.end(data.msg)
            })
        })
    }
    else if( req.url == "/login" && req.method == 'POST'){
        let token=req.headers.authorization || ""
        let post_data=''
        req.on('data',(chunk)=>{
            post_data+=chunk
        })
        req.on('end',()=>{
                login(post_data,token).then((data)=>{
                res.writeHead(data.code,data.msg)
                if (data.token) res.end(data.msg +" Your Token is := "+data.token)
                else res.end(data.msg)
        })

        })
    }else if( req.url == "/logout" && req.method == 'POST'){
        let token=req.headers.authorization || ""
        logout(token).then((data)=>{
            res.writeHead(data.code,data.msg)
            res.end(data.msg)
         })  
    }
    else{
        res.writeHead(404,"Page Not Found")
        res.end("Opps Page is Not available")
    }
}

module.exports=rout