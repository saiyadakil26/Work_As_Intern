const check_password=(pass)=>{
    let patern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    return patern.test(pass)
}

check_password("Akil#pppp")