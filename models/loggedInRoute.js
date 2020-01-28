var mongoose = require("mongoose")
var userSchema = require("./userSchema")
var heckSchema = require("./heckSchema")
var User = mongoose.model("User",userSchema)
var Heck = mongoose.model("Heck",heckSchema)
loggedIn = (req,res)=>{
    User.findById(req.user.id).populate("hecks").populate('starredHecks').exec((err,user)=>{
        if(err){
            res.send(err)
        }else{
            Heck.find({},(err,allHecks)=>{
                if(err){
                    res.send(err)
                }else{
                    res.render("dashboard",{ user : user,allHecks : allHecks })
                }
            })
        }
    })
}
module.exports = loggedIn