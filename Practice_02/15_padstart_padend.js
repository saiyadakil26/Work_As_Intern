// ! padstart and padend both are working same it take a string and extend it upto given length and rest all charecter replace by given string 

const pad_start=(str,symbole,len)=>{ // add charecter in starting
    console.log(str.padStart(len,symbole));
}

const pad_end=(str,symbole,len)=>{ // add charecter in ending
    console.log(str.padEnd(len,symbole));
}

pad_start("Hello","#",10) // OUT:#####Hello
pad_end("Hello","#",10) // OUT : Hello#####