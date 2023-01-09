// ! Here i create one module sum and then export it from here using (module.exports)

const sum=(...arr)=>{
    return  arr.reduce((cv,pv)=>{
        return cv+pv
    })
}
console.log(sum(1,2));

module.exports ={sum} 