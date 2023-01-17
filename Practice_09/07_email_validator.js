const valid_email=(val)=>{
    let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return paten.test(val)
}

console.log(valid_email("saiyadakil26@aau.in"));