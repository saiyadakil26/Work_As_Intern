const time_convert=(time)=>{
    if (time<12 && time !== 0) {
        console.log(`${time} am`);
    } else if(time === 0) {
        console.log("12 am");
    }else{
        time=time-12
        console.log(`${time} pm`);
    }
}

time_convert(0)