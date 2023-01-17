const is_number=(val)=> val !=Infinity && !isNaN(Number(val))

const is_string=(val)=>typeof val === "string"

const is_boolean=(val)=>typeof val === "boolean"

const is_arry=(val)=> Array.isArray(val)

const is_object=(val)=> val.constructor.toString().indexOf('Object')!= -1 ? true : false

const is_date=(val)=> val instanceof Date

const is_function =(val)=> typeof val === 'function'

module.exports={is_arry,is_boolean,is_date,is_number,is_object,is_string,is_function}