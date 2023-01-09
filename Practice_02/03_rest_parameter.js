// ! rest Parameter

const sum = (...Allnumber)=>{           // here we are using spreate operator to get rest parameter we are use this 
    return Allnumber.reduce((pv,cv)=>{  // we dont know about how many number of argument are comes
        return  pv+cv
    },0)
}

console.log(sum(2)); // OUT : 2
console.log(sum(2,3)); // OUT : 5
console.log(sum(2,3,5)); // OUT : 10