const valid=(all_user_data,data)=>{

    return new Promise((res,rej)=>{
        let {email,mobile_number,password} =data
        email=email.trim()
        mobile_number=mobile_number.trim()

        if (!(email&& mobile_number&& password)) { //required field
            rej("Please Provide Requred Information")
        }

        let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if ( ! (email.match(paten))) {  // right E-mail
            rej("Please Provide valid E-mail")
        }
        if (! (mobile_number.length == 10)) {  // right Mobile Number
            rej("Please Provide valid Mobile Number")
        }

        const find_uniq=(field,value)=>{ // check field is uniq or not
            return (i) => i[field] == value;
        }

        if (all_user_data.find(find_uniq("email",email))) {
            rej("Please Provide Unique Email")
        }
        if (all_user_data.find(find_uniq("mobile_number",mobile_number))) {
            rej("Please Provide Unique Mobile Number")
        }
        if (all_user_data.find(find_uniq("password",password))) {
            rej("Password is alraedy taken")
        }
        res("all validate")
    })
}

module.exports=valid