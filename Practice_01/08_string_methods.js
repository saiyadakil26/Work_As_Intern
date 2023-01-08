//! methods related to string

const string_length=(str)=>{ // RETURN THE LENGTH OF STRING
    console.log(str.length);
}

const string_indexof=(str,a)=>{ // return first position(index) of another parameter
    console.log(str.indexOf(a));
}

const string_lastindexof=(str,a)=>{ // return last position (index) of another parameter
    console.log(str.lastIndexOf(a));
}

const string_search=(str,a)=>{ // return first position(index) of another parameter
    console.log(str.search(a));
}

const string_slice=(str,a,b)=>{ // return the slice of string for given starting and ending position
    console.log(str.slice(a,b));
}

const string_substring=(str,a,b)=>{ //retun substring from given string for given parameter
    console.log(str.substring(a,b));
}

const string_substr=(str,a,b)=>{ //retun substring from given string for given parameter
    console.log(str.substr(a,b));
}

const string_replace=(str,a,b)=>{ // replace first parameter's first occurance with second from given string
    console.log(str.replace(a,b));
}
const string_replaceAll=(str,a,b)=>{ // replace first parameter's All occurance with second from given string
    console.log(str.replaceAll(a,b));
}

const string_toUppercase=(str)=>{ //convert whole string in uppercase
    console.log(str.toUpperCase());
}

const string_toLowercase=(str)=>{ //convert whole string in lowercase
    console.log(str.toLowerCase());
}

const string_concate=(str,b)=>{ //concate both strings 
    console.log(str.concat(b));
}

const string_trim=(str)=>{ //remove white space from string starting and ending
    console.log(str.trim());
}

const string_charat=(str,a)=>{ //return charecter from given number
    console.log(str.charAt(a));
}

const string_charcodeat=(str,a)=>{ //return charectercode (ASCII Code) from given number
    console.log(str.charCodeAt(a));
}

const string_split=(str,a)=>{ //return array which split all string by given value
    console.log(str.split(a));
}

string_length("Akil") // OUT:4
string_indexof("my name is saiyad","a") // OUT:4
string_lastindexof("my name is saiyad ","a") // OUT:15
string_search("my name is saiyad ","i") // OUT:8
string_slice("my name is saiyad ",3,7) // OUT:name
string_substring("my name is saiyad ",3,7) // OUT:name
string_substr("my name is saiyad ",3,7) // OUT: name is
string_replace("my name is saiyad ","is","is a") // OUT:my name is a saiyad
string_replaceAll("my name is saiyad ","i","I") // OUT:my name Is saIyad
string_toUppercase("Hello") // OUT:HELLO
string_toLowercase("Hello") // OUT:hello
string_concate("Hello","Akil") // OUT:HelloAkil
string_trim("   Hello   ") // OUT:Hello
string_charat("my name is akil",8) // OUT:i
string_charcodeat("my name is akil",6) // OUT:101
string_split("hello#akil","#") // OUT:["hello","akil"]