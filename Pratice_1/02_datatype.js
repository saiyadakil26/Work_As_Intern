// here define a function to know datatype of variable

const data_type=(variable)=>{
    console.log(typeof variable)  //we use type of keyword to know type of variable.
}

data_type("Akil") // OUT:string
data_type(1) // OUT:number
data_type(true) // OUT:boolean
data_type(undefined) // OUT:undefined
data_type({name:"akil"}) // OUT:object
data_type(null) // OUT:object
data_type([1,2,3]) // OUT:object ( Because it will take as object of Array)
data_type(new Date()) // OUT:object ( Because it will take as object of Date)
data_type(BigInt(1000)) //bigint
data_type(Symbol("Hello")) //symbol