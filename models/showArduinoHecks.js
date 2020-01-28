const mongoose = require("mongoose")
var categorySchema = require("./categorySchema")
const Category = mongoose.model("Category",categorySchema)

showArduino = (req,res)=>{
    Category.find({}).populate("arduinoHecks").exec((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.render("allHecksPage",{ title : "Web Dev Events", hecks : data[0].arduinoHecks })
        }
    })
}
module.exports = showArduino