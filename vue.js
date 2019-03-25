let {error} = require("util");

let abc = async() => {
    //throw new Error('xyz')
    return("ab")
}

let xyz = async() => {
    let def = await abc().catch(()=>{})
    console.log(def)
}

xyz()