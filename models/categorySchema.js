const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    webDevNumber : Number,
    appDevNumber : Number,
    iotNumber : Number,
    arduinoNumber : Number,
    mlNumber : Number,
    otherCategories : Number,
    webHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    appHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    iotHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    arduinoHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    mlHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
    otherHecks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Heck"
        } 
    ],
})

module.exports = categorySchema