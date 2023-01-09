const string_to_obj=(str)=>{
    let arr=str.split("\n")
    let title=arr[0].split(",")
    arr.shift()
    let narr=arr.map((el)=>{
        let element=el.split(",")
        let obj={}
        element.forEach((elm,i) => {
            obj[title[i]]=elm
        });
        return obj
    })
    return narr
}
 console.log(string_to_obj('col1,col2\na,b\nc,d'));