const login = require('../controler/login')
const signup=require('../controler/signup')
const logout=require('../controler/logout')
const users=require('../controler/users')
const user_router=require('./user')

const body_parser=require('../body_parser')

const rout= async (req,res)=>{

    if( req.url == "/signup" && req.method == 'POST'){

        let post_data=await body_parser(req)
        signup(post_data).then((data)=>{
            res.writeHead(data.code,data.msg)
            if (data.token) res.end(data.msg +" Your Token is := "+data.token)
            else res.end(data.msg)
        })

    }
    else if( req.url == "/login" && req.method == 'POST'){

        let token=req.headers.authorization || ""
        let post_data=await body_parser(req)
        login(post_data,token).then((data)=>{
            res.writeHead(data.code,data.msg)
            if (data.token) res.end(data.msg +" Your Token is := "+data.token)
            else res.end(data.msg)
        })

    }else if( req.url == "/logout" && req.method == 'POST'){

        let token=req.headers.authorization || ""
        logout(token).then((data)=>{
            res.writeHead(data.code,data.msg)
            res.end(data.msg)
         })  

    }
    else if( req.url == "/user"){

        let token=req.headers.authorization || ""
        user_router(req,res,token)

    }
    else if( req.url == "/users"){

        users(req,res)

    }
    else{
        res.writeHead(404,"Page Not Found")
        res.end("Opps Page is Not available")
    }
}

module.exports=rout