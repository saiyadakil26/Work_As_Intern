const is_email=(val)=>{
    let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return paten.test(val)
}
const is_strong_pass=(val)=>{
    let patern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    return patern.test(val)
}

const is_mobile=(val)=>{
    return (val.length === 10 && Number(val)) ? true : false
}

module.exports={is_email,is_mobile,is_strong_pass}