const json_string_converter=(data)=>{
    if (typeof data !== 'string'){
        try {
            const result = JSON.stringify(data);
            return result
        } catch (err) {
            return "Something Went Wrong When Converting in string";
        }
    } else{
        try {
            const result = JSON.parse(data);
            return result
        } catch (err) {
            return "Something Went Wrong When Converting in Json";
        }
    }
}

 console.log(json_string_converter([{"name":"akil"}])); 