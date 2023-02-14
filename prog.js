const delete_props=(obj,arr_props)=>{
    arr_props.forEach(el=> {
        delete(obj[el])
    });
    return obj
}

let obj={
    fname:"akil",
    sname:"saiyad",
    age:21,
}

let new_obj=delete_props(obj,["age"])

console.log(new_obj);