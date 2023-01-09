var array = [1, 2];

const result = (arr) => {
   return arr.reduce((a, v) =>{
        return a.concat(a.map(r => [v].concat(r)))
    } , [[]]);
}

console.log(result(array));