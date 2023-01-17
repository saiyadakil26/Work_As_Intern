let data=[
    {
    profileId: 123,
    insites:{
      date: new Date(2023,11,11),
      reaach: 120,
      eng: 10,
      likes: 105
    },
    isActive: false
    },
    {
     insites: {
        date: new Date(2023,11,10),
        reaach: 119,
        eng: 5,
        likes: 101
        }
    },
    {
        profileId: 124,
        insites:{
          date: new Date(2023,11,10),
          reaach: 118,
          eng: 2,
          likes: 100
        },
        isActive:true
    }
]


const remove_deleted_data=(data)=>{
    let new_data=data.filter((el)=>el.profileId != undefined &&  el.isActive)
    return new_data
}

const sort_by=(data,by="date",order="asc")=>{
    order=="asc" ? data.sort((a,b)=> a.insites[by] - b.insites[by]) : data.sort((a,b)=> b.insites[by] - a.insites[by])
    return data
}

const group_by_date=(data)=>{
    let new_data=data.map((el)=>el.insites.date.toDateString())
    let all_date=[...new Set(new_data)]
    let output=[]
    all_date.forEach((el)=>{
        let group_data=data.filter((elm)=>elm.insites.date.toDateString()==el)
        output.push({[el]:group_data})
    })
    return output
}
const group_sort=(data,by,order)=>{
    let group=group_by_date(data)
    group.forEach((el,i)=>{
        [el]=Object.values(el)
        let sort = sort_by(el,by,order)
        group[i]=sort
    })
    return group
}

console.log(group_sort(data,"reaach","desc"));

// let new_data=sort_by(data,"reaach","asc")
// console.log(new_data);

// let new_data=remove_deleted_data(data)
// console.log(new_data);