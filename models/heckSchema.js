var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
var heckSchema = mongoose.Schema({
    eventName : String,
    place : String,
    onDate : Date,
    createdOn : Date,
    duration : String,
    startingTime : String,
    categories : [],
    phone : String,
    username : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    cashPrizes : String,
    minimumMembers : Number,
    maximumMembers : Number,
    entryFees : String,
    heckPoster : String,
    ownerName : String,
    starredBy : Number
})

heckSchema.plugin(passportLocalMongoose)
module.exports = heckSchema