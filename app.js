const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const LocalStratergy = require("passport-local")
const mongoose = require("mongoose")
const methodOverride = require('method-override')
app.set("view engine","ejs")

mongoose.connect("mongodb://localhost:27017/HeckProject" ,  { useUnifiedTopology: true,useNewUrlParser : true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// models =============================
userSchema = require("./models/userSchema")
User = mongoose.model("User",userSchema)
heckSchema = require("./models/heckSchema")
Heck = mongoose.model("Heck",heckSchema)
// routes  ============================
const addPosterToEvent = require("./models/addPosterToEvent")
const createEvent = require("./models/createEvent")
const loggedInRoute = require("./models/loggedInRoute")
const deleteEvent = require("./models/deleteEvent")
const addPhotoToUser = require("./models/addPhotoToUser")
const editUserData = require("./models/editUserData")
const createUser = require("./models/signup")
const starHeck = require("./models/starHeck")
const unstarHeck = require("./models/unstarHeck")
const showAllHecks = require("./models/showAllHecks")
const showAppHecks = require("./models/showAppHecks")
const showWebHecks = require("./models/showWebHecks")
const showIOTHecks = require("./models/showIotHecks")
const showMlHecks = require("./models/showMlHecks")
const showArduinoHecks = require("./models/showArduinoHecks")
const showOtherHecks = require("./models/showotherHecks")


var categorySchema = require("./models/categorySchema")
var Category = mongoose.model("Category",categorySchema) 

app.use(methodOverride("_method"));
app.use(require('express-session')({
    resave : false,saveUninitialized : false,secret : "Hack Project"
}))

app.use(function(req,res,next){
    res.locals.user = req.user
    next();
})

app.use( express.static( "public" ) )

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStratergy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(bodyParser.urlencoded({extended : true}))

app.get("/login",function(req,res){
    res.render("login",{showMessage : false,showError : false})
})

app.get("/",(req,res)=>{
    Heck.find({},(err,allHecks)=>{
        if(err){
            res.send(err)
        }else{       
            Category.find({},(err,found)=>{
                if(err){
                    res.send(err)
                }else{
                    res.render("home",{ allHecks : allHecks, category : found[0] })
                }
            }) 
        }
    })
})

app.get("/showHeck/:id",(req,res)=>{
    Heck.findById(req.params.id,(err,foundHeck)=>{
        if(err){
            res.send(err)
        }else{
            res.render("oneHeck",{ heck : foundHeck })
        }
    })
})

app.post('/createUser',createUser)

app.post("/login",passport.authenticate("local",{  //middleware
    successRedirect: "/loggedIn",   //it will take the data from the form and if it matches with any user in database then will be redirected to secret
    failureRedirect : "/notMatched"    //else will be redirected to login
}),function(req,res){
})

app.get("/loggedIn", isLoggedIn,loggedInRoute)

app.get("/notMatched",(req,res)=>{
    res.render("login",{showError : true,message : "Credentials are wrong!!!",showMessage : false})
})

app.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/login")
})

app.get("/addEvent",isLoggedIn,(req,res)=>{
    res.render("createEvent",{user : req.user})
})

app.post("/addEvent",isLoggedIn,createEvent)

app.get('/aboutus',(req,res)=>{
    res.render("aboutus",{ user : req.user })
})

app.get('/deleteHeck/:heckId/of/:ownerId',isLoggedIn,deleteEvent)

app.post('/uploadInfo/:id',isLoggedIn,editUserData)

app.post('/uploadPhoto/:id',addPhotoToUser)

app.get("/addPoster/To/:eventId",isLoggedIn,(req,res)=>{
    res.render("addPoster",{user : req.user,eventId : req.params.eventId})
})

app.post("/addPoster/To/:eventId",isLoggedIn,addPosterToEvent)

app.get("/starHeck/:heckId/by/:userId",isLoggedIn,starHeck)
app.get("/unstarHeck/:heckId/by/:userId",isLoggedIn,unstarHeck)

app.get("/allHecks",showAllHecks)
app.get("/webDevHecks",showWebHecks)
app.get("/appDevHecks",showAppHecks)
app.get("/iotHecks",showIOTHecks)
app.get("/mlHecks",showMlHecks)
app.get("/arduinoHecks",showArduinoHecks)
app.get("/otherHecks",showOtherHecks)

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(3000,()=>{
    console.log("server at 3000") 
})