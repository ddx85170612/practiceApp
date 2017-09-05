
const user =require('./api/user')
const article =require('./api/article')
let arr =[user,article]

for(let i=1;i<arr.length;i++){
    arr[i].stack.map((item)=>{
        arr[0].stack.push(item)
    })
}

module.exports = user;