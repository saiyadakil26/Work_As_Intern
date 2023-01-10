const string_to_obj=(str)=>{
    let arr=str.split("\n")
    let title=arr[0].split(",")
    arr.shift()
    let narr=arr.map((el)=>{
        let element=el.split(",")
        let obj={}
        title.forEach((elm,i) => {
            //let temp=title[i] || '-'
        //    let temp=title[i];
        //    if (!title[i]) return 0
            obj[elm]=element[i] || '-'
        });
        return obj
    })
    return narr
}
 console.log(string_to_obj('col1,col2\na\nc,d,e,f'));