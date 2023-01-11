const time_convert=(time)=>{
    // if (time<12 && time !== 0) {
    //     console.log(`${time} am`);
    // } else if(time === 0) {
    //     console.log("12 am");
    // }else{
    //     time=time-12
    //     console.log(`${time} pm`);
    // }
    //let output = time<12? time!==0?time+" am":"12 am" :time!==12? time!==24?time-12+" pm":"12 am" :"12 pm"
    let output= (time<12 && time!==0 && time+" am") || (time>12 && time!==24 && (time-12)+" pm") || (time===12 && "12 pm") || (time==0 && "12 am") || (time==24 && "12 am")
    console.log(output)
}


time_convert(0)
time_convert(12)
time_convert(13)
time_convert(23)
time_convert(24)