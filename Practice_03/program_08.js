//in panding
const sort_by=(arr,props,orders)=>
    [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc;
    }, 0)
)

let obj=[
    {name:"pratik",age:19,collage:"ait"},
    {name:"akil",age:19,collage:"dit"},
    {name:"akil",age:20,collage:"cait"},
    
]

let order_by=['age',"collage"]

let order=['asc','desc']

console.log(sort_by(obj,order_by,order))