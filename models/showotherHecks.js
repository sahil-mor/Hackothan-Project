const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)


showOther = (req,res)=>{
    Category.find({}).populate("otherHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "Other Events", hecks : data[0].otherHecks })
        }
    })
}
module.exports = showOther