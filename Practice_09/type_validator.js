const data_type=require('./data_type_check')

const type_validator=(val,type)=>{
    type=type.toLowerCase()
    switch (type) {
        case "number":
            return data_type.is_number(val)
        case "string":
            return data_type.is_string(val)
        case "array":
            return data_type.is_arry(val)
        case "object":
            return data_type.is_object(val)
        case "date":
            return data_type.is_date(val)
        case "boolean":
            return data_type.is_boolean(val)
        case "function":
            return data_type.is_function(val)
        default:
            return typeof val === type
    }
}

// console.log(type_validator({},"object"))

module.exports=type_validator