var mongoose = require("mongoose")
var heckSchema = require("./heckSchema")
var Heck = mongoose.model("Heck",heckSchema)
var multer = require("multer")
var path = require("path")
storage = multer.diskStorage({
    destination : "./public/uploads",
    filename : function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})


const upload = multer({
    storage : storage,
    limits : {filesSize : 1 },
}).single('photo');

addPoster = (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.send(err)
        }else{
            Heck.findById(req.params.eventId,(err,foundHeck)=>{
                if(err){
                    res.send(err)
                }else{
                    foundHeck.heckPoster = req.file.path
                    foundHeck.save((err,savedHeck)=>{
                        if(err){
                            res.send(err)
                        }else{
                            res.render('login',{ showError : true, showMessage : false, message : "Signin to continue" })
                        }
                    })
                }
            })
        }
    })
}

module.exports = addPoster