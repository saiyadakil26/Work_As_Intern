const fs=require('fs')
const crypto=require('crypto')
const jwt=require('jsonwebtoken')
const {add_user_valid}=require('../validator/user')

let user_data=fs.readFileSync('db.json').toString()
user_data=JSON.parse(user_data)

const get_user_view=(id)=>{
   try {
        id=id.trim()
        user_data=user_data.filter((el)=>el.email==id)
        return user_data
   } catch (error) {
        return "Something Went Wrong."
   }
}

const add_user=(post_data)=>{
        return add_user_valid(post_data,user_data).then(()=>{
                post_data.password=crypto.createHash('sha512').update(post_data.password).digest('hex')
                user_data.push(post_data)
                fs.writeFileSync('db.json',JSON.stringify(user_data))
                let Token=jwt.sign(post_data.email,"@090$Ak*khan$313@")
                return `User added Succsessfuly And your Token is := ${Token}`
            }).catch((e)=>{
                return e.toString()
        })
}

const delete_user=(Token)=>{
    try {
        const data_token=jwt.verify(Token,"@090$Ak*khan$313@")
        user_data=user_data.filter((el)=>el.email!=data_token)
        fs.writeFileSync('db.json',JSON.stringify(user_data))
        return "User Deleted Succsessfully"
    } catch (e) {
        return "Something Went Wrong"
    }
}

const login = (Token,post_data)=>{
    try {
        const data_token=jwt.verify(Token,"@090$Ak*khan$313@")
        return `Wellcome ${data_token}`
    } catch (e) {
        post_data.password= crypto.createHash('sha512').update(post_data.password).digest('hex')
        post_data.username=post_data.username.trim()
        login_data=user_data.filter((el)=>el.email==post_data.username && el.password==post_data.password)
        if (login_data.length==1) {
            return `Wellcome ${post_data.username}` 
        }else{
            return "Wrong Credential" 
        }
    }
}


module.exports={get_user_view,add_user,delete_user,login}