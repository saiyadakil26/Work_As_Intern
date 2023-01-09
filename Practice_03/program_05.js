const replace_keys=(obj,replace_obj)=>{

    // ! Solution One :

    //let replace_obj={...obj}
    // update.map((el)=>{
    //     obj[replace_obj[el]]=obj[el]
    //     delete obj[el]
    // })
    // return obj

    // ! Solution two :

    const rename = (({name: firstname,job:Role,...rest}) => ({firstname,Role, ...rest}))
    console.log(rename(obj))
    
}

 replace_keys({name:"Akil",job:"Nodejs Intern",age:19},{name:"firstname",job:"Role"})