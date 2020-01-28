const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)

showML = (req,res)=>{
    Category.find({}).populate("mlHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "ML Events", hecks : data[0].mlHecks })
        }
    })
}
module.exports = showML