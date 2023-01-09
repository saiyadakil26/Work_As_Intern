const compare_obj=(obj1,obj2)=>{
    obj1=JSON.stringify(obj1)
    obj2=JSON.stringify(obj2)
    if (obj1==obj2) {
        return true
    }else{
        return false
    }
}

let obj1={hair:"long",bread:true}
let obj2={hair:"long",bread:false}
console.log(compare_obj(obj1,obj2));