// ! ********************** Objects Methods ****************************//

const obj_assign=(obj1,obj2)=>{ // assign property of other object to new object and return it
    let obj=Object.assign(obj1,obj2)
    console.log(obj);
}

const obj_create=(obj_original)=>{ // crete new object which contain prototype of existing object
    let obj =Object.create(obj_original)
    console.log(obj);
}

const obj_defineProperties=(obj)=>{ // define property in given object
   let nobj= Object.defineProperties(obj,{"age":{"value":19}})
   console.log(nobj.age);
}

const obj_defineProperty=(obj)=>{ // just work like a define properties
    let nobj= Object.defineProperty(obj,"age",{"value":19})
    console.log(nobj.age);
}

const obj_entries=(obj)=>{ // return key and values as a form of array (entries)
    let result = Object.entries(obj)
    console.log(result);
}

const obj_freez=(obj)=>{ // freez object so we can not modify it further
    Object.freeze(obj)
    obj={} // Throw an error
}

const obj_fromentity=(arr)=>{ // make object fro given entries (array)
    let obj = Object.fromEntries(arr)
    console.log(obj);
}

const obj_getOwnPropertyDescriptor=(obj)=>{ // get discription of given property
    let obj1 = Object.getOwnPropertyDescriptor(obj, "emp1")
    console.log(obj1);
}

const obj_getOwnPropertyDescriptors=(obj)=>{ //give description of all propertys of object
    let obj1 = Object.getOwnPropertyDescriptors(obj)
    console.log(obj1);
}

const obj_getOwnPropertyNames=(obj)=>{ // return all propertys name of object as array
    let obj1 = Object.getOwnPropertyNames(obj)
    console.log(obj1);
}

const obj_getOwnPropertySymbols=(obj)=>{ // return array of symbole if our object contain any symbole as property
    let obj1 = Object.getOwnPropertySymbols(obj)
    console.log(obj1);
}

const obj_getPrototypeOf=(obj)=>{ // return prototype of object
    let obj1 = Object.getPrototypeOf(obj)
    console.log(obj1);
}

const obj_is=(obj1,obj2)=>{ // compare two object and return boolean
    let obj = Object.is(obj1,obj2)
    console.log(obj);
}

const obj_extensible=(obj1)=>{ // return true if object is extensible
    let obj = Object.isExtensible(obj1)
    console.log(obj);
}

const obj_Frozen=(obj1)=>{ //return true if object is freez
    let obj = Object.isFrozen(obj1)
    console.log(obj);
}

const obj_Sealed=(obj1)=>{ //return true if object is sealed
    let obj = Object.isSealed(obj1)
    console.log(obj);
}

const obj_Seal=(obj1)=>{ //seal object so we can not modify it further
    let obj = Object.seal(obj1)
    console.log(obj);
}

const obj_keys=(obj1)=>{ // return array of all keys (property) of object
    let obj = Object.keys(obj1)
    console.log(obj);
}

const obj_preventExtensions=(obj1)=>{  //prevent property so we can extend this object in future
    let obj = Object.preventExtensions(obj1)
    console.log(obj);
}

const obj_setPrototypeOf=(obj1,prop)=>{ //set prototype of object
    let obj = Object.setPrototypeOf(obj1,prop)
    console.log(obj);
}

//********************** Objects As Test Data ****************************//

let employe={
    "emp1":28,
    "emp2":25
}
let intern={
    "int1":28
}

//********************** Function call ****************************//

obj_assign(employe,intern) //OUT: { emp1: 28, emp2: 25, int1: 28 }
obj_create(employe) // OUT:{} create object (value of object goes into prototype of new object)
obj_defineProperty(employe) // OUT : 19
obj_defineProperty(employe)  // OUT : 19
obj_entries(intern) // OUT : [ [ 'int1', 28 ] ]
obj_freez(intern) // freez object
obj_fromentity([["name","akil"]]) // OUT : { name: 'akil' }
obj_getOwnPropertyDescriptor(employe) // OUT : { value: 28, writable: true, enumerable: true, configurable: true }
obj_getOwnPropertyDescriptors(employe) // OUT : { emp1: { value: 28, writable: true, enumerable: true, configurable: true },emp2: { value: 25, writable: true, enumerable: true, configurable: true }, int1: { value: 28, writable: true, enumerable: true, configurable: true },age: { value: 19,writable: false,enumerable: false,configurable: false }}
obj_getOwnPropertyNames(employe) // OUT : [ 'emp1', 'emp2', 'int1', 'age' ]
obj_getOwnPropertySymbols(employe) // OUT : []
obj_getPrototypeOf(employe) // OUT : [Object: null prototype] {}
obj_is(employe,employe) // OUT : true
obj_extensible(employe) // OUT : true
obj_Frozen(intern) // OUT : true
obj_Sealed(intern) // OUT : true
obj_Seal(intern) // OUT : { int1: 28 }
obj_keys(employe) // OUT : [ 'emp1', 'emp2', 'int1' ]
obj_preventExtensions(intern) // OUT : { int1: 28 }
obj_setPrototypeOf(employe,null) // OUT : [Object: null prototype] { emp1: 28, emp2: 25, int1: 28 }