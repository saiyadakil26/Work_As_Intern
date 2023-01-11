//dout_full

const sort_by=(arr,props,orders)=>{
    arr.sort((a,b)=>{
        for (const i of props) {
            let val1=a[i]
            let val2=b[i]
            // console.log(val1,val2);
            if (val1>val2) return orders[props.indexOf(i)]=="asc"?1:-1
            else if(val1<val2) return orders[props.indexOf(i)]=="asc"?-1:1
        }   
    })
    return arr
}

let obj=[
  {name:"pratik",age:19},
  {name:"akil",age:19},
  {name:"akil",age:20}
]

let order_by=['name',"age"]

let order=['asc','desc']

console.log(sort_by(obj,order_by,order))