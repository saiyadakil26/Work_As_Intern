// dout_full
var array = [1, 2,3,4,5];
const result = (arr) => {
   return arr.reduce((pv, cv) =>{
    pv.map((el)=>{
        pv.push([...el,cv])
    })
    return pv
    } , [[]]);
}
console.log(result(array));