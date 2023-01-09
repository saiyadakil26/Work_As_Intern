// ! startwith check string whether start with given word then return true else false

const startwith=(str,word)=>{
   console.log(str.startsWith(word)); 
}

// ! endwith check string whether end with given word then return true else false

const endwith=(str,word)=>{
    console.log(str.endsWith(word)); 
}

startwith("Hello","L") // OUT:false
endwith("Hello","o") // OUT:true