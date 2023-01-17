const is_number=(val)=>{
    if (typeof val === "number")  return  val != NaN && val !=Infinity
    return  val != NaN && val !=Infinity && !isNaN(Number(val))
}

const is_string=(val)=>typeof val === "string"

const is_boolean=(val)=>typeof val === "boolean"

const is_arry=(val)=> Array.isArray(val)

const is_object=(val)=> typeof val === "object" && !(Array.isArray(val)) && val != null && !(val instanceof Date)

const is_date=(val)=> val instanceof Date

const is_function =(val)=> typeof val === 'function'

module.exports={is_arry,is_boolean,is_date,is_number,is_object,is_string,is_function}