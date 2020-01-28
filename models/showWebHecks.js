const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)

showWeb = (req,res)=>{
    Category.find({}).populate("webHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "Web Dev Events", hecks : data[0].webHecks })
        }
    })
}
module.exports = showWeb