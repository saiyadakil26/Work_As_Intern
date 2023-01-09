const yes_No = (val) =>{
  return (/^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ) ? false : false;
}

console.log(yes_No('Y')); 
console.log(yes_No('yes'));  
console.log(yes_No('No')); 