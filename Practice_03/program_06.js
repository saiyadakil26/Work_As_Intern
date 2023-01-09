const find_non_uniq=(arr)=>{
    const duplicates = arr.filter((e, index, array) => {
        return array.indexOf(e) === array.lastIndexOf(e);
    })
    return duplicates
}
console.log(find_non_uniq([1,2,2,3,4,4,5])); 