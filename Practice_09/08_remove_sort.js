let data=[
    {
    profileId: 123,
    insites:{
      date: new Date(11-11-2023),
      reaach: 120,
      eng: 10,
      likes: 105
    },
    isActive: false
    },
    {
     insites: {
        date: new Date(11-10-2023),
        reaach: 119,
        eng: 5,
        likes: 101
        }
    },
    {
        profileId: 124,
        insites:{
          date: new Date(11-12-2023),
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

// let new_data=sort_by(data,"reaach","asc")
// console.log(new_data);

// let new_data=remove_deleted_data(data)
// console.log(new_data);