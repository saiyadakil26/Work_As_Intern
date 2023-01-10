let objs=[
    {name:"akil",age:20},
    {name:"pratik",age:19},
    {name:"Akil",age:19}
]

let order_by=['name',"age"]

const order=['asc','desc']

objs.sort((a,b)=>{
    for (const i of order_by) {
    let idx=order_by.indexOf(i)
       let val1=a[i]
       let val2=b[i]
       if (typeof val1 === 'string') {
            val1=val1.toLowerCase()
            val2=val2.toLowerCase()
       }
       if (val1>val2) return order[idx]==='asc'? 1 : -1
       else if (val1<val2) return order[idx]==='asc'? -1 : 1
    }
})

console.log(objs);