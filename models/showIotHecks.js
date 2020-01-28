const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)

showIOT = (req,res)=>{
    Category.find({}).populate("iotHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "IOT Events", hecks : data[0].iotHecks })
        }
    })
}
module.exports = showIOT