const delete_prop=(obj,arr)=>{
    arr.forEach(el => {
        delete obj[el]
    });
    return obj
}

console.log(delete_prop({a:1,b:2,c:3},["b"]))