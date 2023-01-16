const fs=require('fs')

const users=(req,res)=>{
    try {
        let old_data = fs.readFileSync(__dirname+"\\db.json");
        res.writeHead(200,"OK")
        res.end(old_data)
    } catch (e) {
        res.writeHead(400,"Bad Request")
        res.end("Something Went Wrong")
    }

}

module.exports=users