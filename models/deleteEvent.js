var mongoose = require("mongoose")
var heckSchema = require("./heckSchema")
var Heck = mongoose.model("Heck",heckSchema)

deleteEvent = (req,res)=>{
    Heck.findByIdAndRemove(req.params.heckId,(err,foundHeck)=>{
        if(err){
            res.send(err)
        }{
            User.findById(req.user.id,(err,foundUser)=>{
                if(err){
                    res.send(err)
                }else{
                    foundUser.numberOfHecks -= 1
                    foundUser.save((err,savedUser)=>{
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
module.exports = deleteEvent