//***************** While loop *********************//
//(While loop is have condition at the enry poin its run untill condition not satisfied)

let b=0 
while (b!==10) {
    console.log(b+1); //OUT: print 1 to 10
    b++
}

//***************** For loop *********************//
//(For loop is can have three argument first is starting poin second is exitcondition third is increment)

for (let i = 0; i < 10; i++) {
    console.log(i+1); //OUT: print 1 to 10
}

//***************** For in *********************//
//(For in loop is used to itterate object or array)

let arr=[1,2,3,4,5]

for (const i in arr) {
    console.log(i); //OUT: print 1 to 5
}

let obj={name:"akil",age:19}

for (const i in obj) {
    console.log(i); // we can get key here //OUT: print keys of object
    console.log(obj[i]); // we can render value like that //OUT: print values of keys
}

//***************** For Each loop *********************//
//(For in loop is used to itterate array return element one by one)

let arr1=[1,2,3,4,5]
arr1.forEach((el)=>{
    console.log(el); //OUT: print 1 to 5
})
