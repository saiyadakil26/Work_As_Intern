//dout_full
const sort_by=(arr,props,orders)=>{

    // return [...arr].sort((a, b) =>
    //   props.reduce((acc, prop, i) => {
    //     if (acc === 0) {
    //       const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
    //       acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
    //     }
    //     return acc;
    //   }, 0)
    // )

    return arr.sort((a,b)=>{
              for (const i of props) {
              let idx=props.indexOf(i)
                let val1=a[i]
                let val2=b[i]
                if (typeof val1 === 'string') {
                      val1=val1.toLowerCase()
                      val2=val2.toLowerCase()
                }
                if (val1>val2) return orders[idx]==='asc'? 1 : -1
                else if (val1<val2) return orders[idx]==='asc'? -1 : 1
              }
            })
}

let obj=[
  {name:"pratik",age:19},
  {name:"akil",age:19},
  {name:"akil",age:20}, 
]

let order_by=['name',"age"]

let order=['asc','asc']

console.log(sort_by(obj,order_by,order))