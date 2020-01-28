const mongoose = require("mongoose")
const userSchema = require("./userSchema")
const User = mongoose.model("User",userSchema)

editUserData = (req,res)=>{
    User.findById(req.params.id,(err,foundUser)=>{
        if(err){
            console.log(err)
            res.redirect("/loggedIn")
        }else{
            foundUser.username = req.body.username
            foundUser.mobile = req.body.mobile
            foundUser.save((err,savedUser)=>{
                if(err){
                    console.log(err)
                    res.redirect("/loggedIn")
                }else{
                    res.render('login',{ showError : true , showMessage : false, message : "Please signin to continue"})
                }
            })
        }
    })
}
module.exports = editUserData