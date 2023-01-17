const accountMaster = [
    {
      accountId: 1,
      accountName: 'Twitter',
      isActive: true
    },
    {
      accountId: 2,
      accountName: 'Facebook',
      isActive: false
    },
    {
      accountId: 3,
      accountName: 'Linkedin',
      isActive: true
    },
    {
      accountId: 4,
      accountName: 'FB page',
      isActive: false
    }
]

const check_account=(id)=>{
    arr_id=accountMaster.map((el)=>el.accountId)
    max_id=Math.max(...arr_id)
    min_id=Math.min(...arr_id)
    if ( id> max_id || id < min_id) {
        console.log("Invalid Id");
        return false
    }
    return accountMaster.filter((el)=>el.accountId==id)[0].isActive || false
}

console.log(check_account(3))