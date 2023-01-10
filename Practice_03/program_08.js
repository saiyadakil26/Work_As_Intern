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

  //  return arr.sort((a,b)=>{
  //     if (a.name > b.name) return orders[0] === 'asc' ? -1 : 1
  //     if (a.name < b.name) return orders[0] === 'asc' ? 1 : -1
  //     if (a.name == b.name) {
  //       if (a.age > b.age) return orders[1] === 'asc' ? -1 : 1
  //       if (a.age < b.age) return orders[1] === 'asc' ? 1 : -1
  //     }
  //  })
  
}
let obj=[
  {name:"pratik",age:19},
  {name:"akil",age:19},
  {name:"akil",age:20}, 
]

let order_by=['name',"age"]

let order=['asc','desc']

console.log(sort_by(obj,order_by,order))