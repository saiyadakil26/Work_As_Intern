// dout_full
var array = [1, 2];
const result = (arr) => {
//    return arr.reduce((a, v) =>{
//         return a.concat(a.map(r => [v].concat(r)))
//     } , [[]]);

    return arr.reduce((pv, cv) =>{
        pv.map((el)=>{
            pv.push([...el,cv])
        })
        return pv
    } , [[]]);
}

console.log(result(array));