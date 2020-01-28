const mongoose = require("mongoose")
const heckSchema = require("./heckSchema")
const userSchema = require("./userSchema")
const Heck = mongoose.model("Heck",heckSchema)
const User = mongoose.model("User",userSchema)
unstarHeck = (req,res)=>{
    var index = 0; var count = 0;
    if(req.params.userId != req.user.id){
        res.redirect("loggedIn")
    }else{
        Heck.findById(req.user.heckId,(err,foundHeck)=>{
            if(err){
                res.send(err)
            }else{
                User.findById(req.params.userId,(err,foundUser)=>{
                    if(err){
                        res.send(err)
                    }else{
                        foundUser.starredHecks.forEach(function(h){
                            if(h == req.params.heckId){
                                index = count
                            }else{
                            }
                            count += 1
                        })
                        delete foundUser.starredHecks[index]
                        foundHeck.starredBy -= 1
                        foundUser.numberOfStarredHecks -= 1
                        foundUser.save(function(err,savedUser){
                            if(err){
                                res.send(err)
                            }else{
                                User.findByIdAndUpdate(req.params.userId,savedUser,function(err,updated){
                                    if(err){
                                        res.send(err)
                                    }else{
                                        res.render('login',{ showError : true , showMessage : false, message : "Please signin to continue"})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
       
    }
}
module.exports = unstarHeck