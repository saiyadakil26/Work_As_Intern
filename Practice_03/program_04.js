// dout_full
var array = [1];
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

    // return arr.reduce((pv, cv) =>{
    //         pv.reduce((pv1,cv1)=>{
    //             pv.push([...cv1,cv])
    //             return pv
    //         },[[]])
    //         return pv
    // } , [[]]);

}

console.log(result(array));