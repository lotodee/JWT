const User = require('../models/User')


module.exports.set_cookie=(req,res)=>{

    res.cookie('newUser' , true  , {maxAge:1000*60*60*24 , httpOnly:true})
res.send("the cookie is here")
}

module.exports.read_cookie=(req,res)=>{
let cookies = req.cookies;

res.json(cookies)
console.log(cookies)

}
