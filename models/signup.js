const mongoose = require("mongoose")
const userSchema = require("./userSchema")
const User = mongoose.model("User",userSchema)
const passport = require("passport")

signup = (req,res)=>{
    if(req.body.password !== req.body.confirmPassword){
        res.render("login",{showError : false,showMessage : true, message : "Passwords don't match"})
    }else{
        User.findOne({ email : req.body.email },(err,foundUser)=>{
            if(err){
                console.log(err)
                res.redirect("login")
            }else{
                if(foundUser != null){
                    res.render("login",{showError : false,showMessage : true, message : "Email already taken"})
                }else{
                    User.findOne({ mobile : req.body.mobile },(err,foundUser)=>{
                        if(err){
                            console.log(err)
                            res.redirect("login")
                        }else{
                            if(foundUser != null){
                                res.render("login",{showError : false,showMessage : true, message : "Mobile Already Taken"})
                            }else{
                                User.register(new User({ email : req.body.email,mobile : req.body.mobile,joinedOn : Date.now(),username : req.body.name,
                                    numberOfStarredHecks : 0,numberOfHecks : 0 }),req.body.password,(err,user)=>{
                                    if(err){
                                        console.log(err)
                                        console.log("at last step")
                                        res.redirect("login")
                                    }else{
                                        passport.authenticate("local")(req,res,function(){
                                            console.log("new user is being authenticated")
                                            console.log(user)
                                            res.render("loggedIn")
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })    
    }
}
module.exports = signup