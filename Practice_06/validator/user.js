const add_user_valid=(user_data,all_user_data)=>{
    let {email,mobile_number,password} =user_data
    email=email.trim()
    mobile_number=mobile_number
    return new Promise((res,rej)=>{
       if ( !(email&& mobile_number&& password)) {
            rej("Please Fill Reqire Fill")
       }
       let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
       if (!(email.match(paten))) {
            rej("Invalid E-mail")
       }
       if (!(mobile_number.length == 10)) {
            rej("Invalid Mobile Number")
        }
        if (all_user_data.find(find_uniq("email",email))) {
            rej("Please Provide Unique Email")
        }
        if (all_user_data.find(find_uniq("mobile_number",mobile_number))) {
            rej("Please Provide Unique Mobile Number")
        }
        res("all validate")
    })
}


const find_uniq=(field,value)=>{ // check field is uniq or not
    return (i) => i[field] == value;
}


module.exports={add_user_valid}