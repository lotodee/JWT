const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {isEmail}= require("validator")
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
  });
//firing funcition after saved to db

//my idea//
// const verify = async(password , hash)=>{

//   check =await bcrypt.compare(password , hash)
//  if(check){
//    return  check
//  }
 
//  throw Error('incorrect password')
 
// }
 userSchema.post('save' , (doc,next)=>{
    
    console.log("user has been saved" , doc)
    next();
})
//firing function before being saved to db
userSchema.pre('save' ,async function(next){
    const salt = await bcrypt.genSalt()
    console.log(salt)
    this.password = await bcrypt.hash(this.password , salt)
    
    console.log("user is about to be created", this)
    next()

   
})

userSchema.statics.login= async function (email , password){
  
  const user = await this.findOne({email})
  if(user){
    const auth=await bcrypt.compare(password, user.password)
    if(auth)
    return user
  }
  throw Error("incorrect email or password")

  }




const User = mongoose.model('user' , userSchema)

/*  */
module.exports=User