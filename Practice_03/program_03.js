const array_to_string=(arr)=>{
    let valarr=[]
    let narr=arr.map((el)=>{
        valarr.push(Object.values(el))
        return Object.keys(el)
    })
    let nset=new Set([...narr.flat()])
    let output=Array.from(nset).join(",")

    // valarr = valarr.map((el)=>{
    //     if (el.length!=nset.size) {
    //         return Object.assign(new Array(nset.size).fill('-'), el)
    //     }else{
    //         return el
    //     }
    // })

    let val=valarr.join("\\n")
    let finaloutput=output+"\\n"+val
    return finaloutput
}
 console.log(array_to_string([{col1:"a",col2:"b"},{col1:"c",col2:"d"}])) 