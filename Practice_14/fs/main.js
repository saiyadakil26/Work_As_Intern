const fs = require('fs')

if(! fs.existsSync('akil.txt')){
    try {
        fs.writeFile('akil.txt','hello Akil','utf-8',(err)=>{
            if (err) console.log("something went wrong.");
            else console.log("Done.");
        })
    } catch (error) {
        console.log(error);
    }

}else{
    // const new_data ="\nHow are You. "
    // try {
    //     fs.appendFile('akil.txt',new_data,'utf-8',(err)=>{
    //         if (err) console.log(err);
    //         else{
    //             const final_data = fs.readFileSync('akil.txt').toString()
    //             console.log(final_data);
    //         }
    //     })
    // } catch (error) {
    //     console.log(err);
    // }
    // fs.unlink('akil.txt',(err)=>{
    //     console.log("Deleted");
    // })
    fs.open('akil.txt','r',(err,fd)=>{
        if(err) console.log(err)
        else console.log(fd);
    })
}