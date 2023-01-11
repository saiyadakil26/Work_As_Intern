const compare_obj=(obj1,obj2)=>{
 
    obj1= JSON.stringify(Object.entries(obj1).sort()) 
    obj2=JSON.stringify(Object.entries(obj2).sort())
    console.log(obj1);
    console.log(obj2);
    if (obj1==obj2) {
        return true
    }else{
        return false
    }
}

let obj1={hair:"long",bread:true}
let obj2={bread:true, hair: 'long'}
console.log(compare_obj(obj1,obj2));