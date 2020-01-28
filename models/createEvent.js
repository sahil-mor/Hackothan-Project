var mongoose = require("mongoose")
var heckSchema = require("./heckSchema")
var Heck = mongoose.model("Heck",heckSchema)
var userSchema = require("./userSchema")
var User = mongoose.model("User",userSchema)
var categorySchema = require("./categorySchema")
var Category = mongoose.model("Category",categorySchema) 

var web = false, app = false, iot = false, arduino = false,other = false , ml = false
createEvent = (req,res)=>{
    Category.find({},(err,found)=>{
        if(err){
            res.send(err)
        }else{
            var newHeck = {
                username : req.user,
                eventName : req.body.heckName,
                place : req.body.place,
                onDate : req.body.date,
                createdOn : Date.now(),
                duration : req.body.duration,
                startingTime : req.body.startingTime,
                phone : req.body.areaCode + " " + req.body.phone, 
                categories : [],
                cashPrizes : req.body.cashPrizes,
                minimumMembers : req.body.minimumMembers,
                maximumMembers : req.body.maximumMembers,
                entryFees : req.body.entryFees,
                ownerName : req.user.username,
                starredBy : 0
            }
            if(req.body.ml != undefined){
                newHeck.categories.push("Machine Learning")
                found[0].mlNumber += 1
                ml = true
            }if(req.body.appDev != undefined){
                newHeck.categories.push("App Dev")
                found[0].appDevNumber += 1
                app = true
            }if(req.body.webDev != undefined){
                newHeck.categories.push("Website Dev")
                found[0].webDevNumber += 1
                web = true
            }if(req.body.iot != undefined){
                newHeck.categories.push("Internet Of Things")
                found[0].iotNumber += 1
                iot = true
            }if(req.body.arduino != undefined){
                newHeck.categories.push("Arduino")
                found[0].arduinoNumber += 1
                arduino = true
            }if(req.body.other != undefined){
                newHeck.categories.push(req.body.other)
                found[0].otherCategories += 1
                other = true
            }
            Heck.create(newHeck,(err,createdHeck)=>{
                if(err){
                    console.log(err)
                    res.redirect('loggedIn')
                }else{
                    User.findById(req.user.id,(err,foundUser)=>{
                        if(err){
                            res.send(err)
                        }else{
                            foundUser.hecks.push(createdHeck)
                            foundUser.numberOfHecks += 1
                            if(web){
                                found[0].webHecks.push(createdHeck)
                            }
                            if(app){
                                found[0].appHecks.push(createdHeck)
                            }
                            if(iot){
                                found[0].iotHecks.push(createdHeck)
                            }
                            if(arduino){
                                found[0].arduinoHecks.push(createdHeck)
                            }
                            if(ml){
                                found[0].mlHecks.push(createdHeck)
                            }
                            if(other){
                                found[0].otherHecks.push(createdHeck)
                            }
                            foundUser.save((err,savedUser)=>{
                                if(err){
                                    res.send(err)
                                }else{
                                    found[0].save((err,savedC)=>{
                                        if(err){
                                            res.send(err)
                                        }else{
                                            res.redirect("loggedIn")
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    
}
module.exports = createEvent