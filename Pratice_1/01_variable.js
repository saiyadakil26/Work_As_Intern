//*************** var *******************//

var a=10 // var have a global scope  so we can reassigi and acess  it anywhere  in this file.

console.log(a); // OUTPUT: 10

{
    console.log(a); // OUTPUT: 10
    a=20 
    console.log(a); // OUTPUT: 20
}

console.log(a); // OUTPUT: 20

//*************** const *******************//

const b=10 // const have a local scope and it is Ummutable

console.log(b); // OUTPUT: 10

{
    const c=10
    console.log(b); // OUTPUT: 10
    console.log(c); // OUTPUT: 10
    b=20 // TypeError: Assignment to constant variable.
}

console.log(b); // OUTPUT: 10
console.log(c); // ReferenceError: c is not defined

//*************** let *******************//

let d=10 // let have a local scope and it is mutable

console.log(d); // OUTPUT: 10

{
    let e=10
    console.log(d); // OUTPUT: 10
    let d=20
    console.log(e); // OUTPUT: 10
    console.log(d); // OUTPUT: 20
}

console.log(d); // OUTPUT: 10
console.log(e); // ReferenceError: e is not defined

// ! we can declare variable without any keyword (let,const,var) but it behave just like var

//*************************************//