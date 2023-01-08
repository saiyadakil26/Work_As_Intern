// ! array methods

const arr_foreach=(arr)=>{ //itreat array and return every single element in array
    arr.forEach((el)=>{
        console.log(el);
    })
}

const arr_filter=(arr)=>{  // filter the array and return new array which contain element which fullfill condition 
    let a = arr.filter((el)=>{
        return el > 3
    })
    console.log(a);
}

const arr_reducer=(arr)=>{ // return one value from all element of array 
    let sum = arr.reduce((pv,cv)=>{
       return pv+cv
    },0)
    console.log(sum);
}

const arr_indexof=(arr,i)=>{ // return index of element which is given in second argument
    let index=arr.indexOf(i)
    console.log(index);
}

const arr_map=(arr)=>{ // aplly operation on all element of existing array and return a new array
    let narr = arr.map((el)=>{
        return el*2
    })
    console.log(narr);
}

const arr_reduce_right=(arr)=>{  // work just like reducer but from right side
    let sum=arr.reduceRight((pv,cv)=>{  // ? here cv :current value and pv:previous value
        console.log("current value : ",cv,"previes value : ",pv);    // current value :  3 previes value :  4
        return pv+cv                                                 // current value :  2 previes value :  7
    })                                                               // current value :  1 previes value :  9
    console.log(sum);
}

const arr_last_indexof=(arr,el)=>{ // return last index of element occurance.
    let l_index=arr.lastIndexOf(el)
    console.log(l_index);
}

const arr_sort=(arr,order=1)=>{  // sort arrays element
    if (order===-1) {
        console.log(arr.sort((a,b)=>b-a));  // sort in decending order
    }else{
        console.log(arr.sort((a,b)=>a-b));  // sort in assending order
    } 
}

const arr_some=(arr)=>{ // return true if any one element from array fullfill condition
  let result =  arr.some((el)=>{
        return  el % 2==0
    })
    console.log(result); 
}

const arr_every=(arr)=>{ // return true if all element from array fullfill condition
    let result = arr.every((el)=>{
       return el % 2 == 0
    })
    console.log(result); 
}

const arr_incluse=(arr,el)=>{ //return true if array contain element
   let result= arr.includes(el)
   console.log(result);
}

const arr_reverce=(arr)=>{ // reverce all element from array
    let narr=arr.reverse(arr)
    console.log(narr);
}

const arr_find=(arr,el)=>{ // find element in arrar and return element if it exist 
   let result= arr.find((elm)=>{
    return elm===el
   })
   console.log(result);
}

const arr_splite=(arr,min=0,max=1)=>{ //split arrays element in the given range
   let result= arr.splice(min,max)
   console.log(result);
}

const arr_findindex=(arr,el)=>{ //it return index of element first occurance
    let result =arr.findIndex((elm)=>{
        return elm===el
    })
    console.log(result);
}

const arr_join=(arr,join)=>{ // join value with all  element of array (escap last one)
    let result=arr.join(join)
    console.log(result);
}

arr_foreach([1,2,3,4])    // OUT : 1 2 3 4
arr_filter([1,2,3,4])    // OUT : [4]
arr_reducer([1,2,3,4])    // OUT : 10
arr_indexof([1,2,3,4,5],5)    // OUT : 4
arr_map([1,2,3,4,5])    // OUT : [2,4,6,8,10]
arr_reduce_right([1,2,3,4])    // OUT : 10
arr_last_indexof([1,2,4,3,4],4)    // OUT : 4
arr_sort([1,4,3,2],1)    // OUT : [1,2,3,4]
arr_sort([1,4,3,2],-1)    // OUT : [4,3,2,1]
arr_every([2,4,8])    // OUT : true
arr_some([1,3,4,5])    // OUT : true
arr_reverce([1,2,3,4])    // OUT : [4,3,2,1]
arr_incluse([1,2,3,4],5)    // OUT : false
arr_find([1,2,3,4],3)     // OUT : 3
arr_splite([1,2,3,4],2,3)     // OUT : [3,4]
arr_findindex([1,2,3,4],1)    // OUT : 0
arr_join([1,2,3,4]," - goal ")    // OUT : 1 - goal 2 - goal 3 - goal 4