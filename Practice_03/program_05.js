const replace_keys=(obj,replace_obj)=>{

    // ! Solution One :

    let update=Object.keys(replace_obj)
    update.map((el)=>{
        obj[replace_obj[el]]=obj[el]
        delete obj[el]
    })
    return obj

    // ! Solution two :
    // const rename = (({name: firstname,job:Role,...rest}) => ({firstname,Role, ...rest}))
    // console.log(rename(obj))
    
}

 console.log(replace_keys({name:"Akil",job:"Nodejs Intern",age:19},{name:"firstname",job:"Role"}))