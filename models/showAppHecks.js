const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)

showApp = (req,res)=>{
    Category.find({}).populate("appHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "App Dev Events", hecks : data[0].appHecks })
        }
    })
}
module.exports = showApp