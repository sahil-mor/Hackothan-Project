const mongoose = require("mongoose")
var heckSchema = require("./heckSchema")
const Heck = mongoose.model("Heck",heckSchema)
showAll = (req,res)=>{
    Heck.find({},(err,all)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "All Events", hecks : all })
        }
    })
}
module.exports = showAll