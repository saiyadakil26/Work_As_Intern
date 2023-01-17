const featureAccess  ={
    "account":{
      team : true,
      client: false,
      owner: true
    },
    "group":{
      team: true,
      client: false,
      owner: true
    }
  }
  
  
const checkAccess = (role, featureName)=> {
    // let features=Object.keys(featureAccess)
    // if (features.includes(featureName)) {
    //     if (featureAccess[featureName][role]) {
    //         console.log("Access Allow");
    //         return true
    //     }else{
    //         console.log("Access Denied");
    //     }  
    // } else {
    //     console.log("Feature Not exist");
    //     return false
    // }
    return featureAccess[featureName] && featureAccess[featureName][role]
}

checkAccess("owner","group")