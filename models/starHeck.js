const mongoose = require("mongoose")
const heckSchema = require("./heckSchema")
const userSchema = require("./userSchema")
const Heck = mongoose.model("Heck",heckSchema)
const User = mongoose.model("User",userSchema)
starHeck = (req,res)=>{
    if(req.params.userId != req.user.id){
        res.redirect("loggedIn")
    }else{
        Heck.findById(req.params.heckId,(err,foundHeck)=>{
            if(err){
                res.send(err)
            }else{
                User.findById(req.params.userId,(err,foundUser)=>{
                    if(err){
                        res.send(err)
                    }else{
                        if(foundUser.starredHecks.includes(foundHeck.id)){
                            console.log("alredy starred")
                            res.render('login',{ showError : true , showMessage : false, message : "Please signin to continue"})
                        }else{
                            foundHeck.starredBy += 1
                            foundUser.starredHecks.push(foundHeck)
                            foundUser.numberOfStarredHecks += 1
                            foundUser.save((err,savedUser)=>{
                                if(err){
                                    res.send(err)
                                }else{
                                    res.render('login',{ showError : true , showMessage : false, message : "Please signin to continue"})
                                }
                            })
                        }
                    }
                })
            }
        })
    }
}
module.exports = starHeck