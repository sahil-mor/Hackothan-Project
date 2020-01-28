var mongoose =require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port=3000;
var path=require("path");

const nexmo = new Nexmo({
  apiKey: '069d9c17',
  apiSecret: 'fExnHyuCIYeomx8E',
});

mongoose.Promise = global.Promise;
var db=mongoose.connect('mongodb://localhost:27017/my_db',function (err) {
 
   if (err) throw err;
   else console.log('Successfully connected');
 
});

const from = '919811959784';
const text = 'You Have Successfully registered at TeekaLagao';

app.get('/',(req,res)=>{
	res.redirect('/home');
});

app.get('/home', (req, res) => {
 res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(__dirname));

var hackSchema = mongoose.Schema({
   Name: String,
   Organisation:String,
   Place: String,
   Date: Date,
   Duration:String,
   Category:Array,
   Fees: String,
   CashP:Number,
   Website: String,
   Description:String
});

var Hackathon = mongoose.model("Hackathon", hackSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/addhack", (req, res) => {
   var newHack=new Hack({
   childName: req.body.childName,
   age: req.body.age ,
   id:req.body.id,
   parentName: req.body.parentName,
   dob:req.body.dob,
   Weight:req.body.	Weight,
   Mobile:req.body.Mobile,
   Password:req.body.Password
 	})
   	newPerson.save(function(err, doc){
		if(err) res.json(err);
		else {res.send('Successfully Registered!');
				 res.json(Person);
         var tosend = '91'+req.body.Mobile;
         nexmo.message.sendSms(from, tosend, text);
         alert('Redirecting to home page')
         res.redirect('/home');
    }
	});
});

app.get('/login', function(req, res){
   res.render('login');
});


app.post('/user/:id', function(req, res)
{
    Person.findOne({id: req.body.lname, Password: req.body.lpass}, function(err, user){
        if(err) {
          res.send("Enter");
        }
        else if(user){
              return res.redirect('/user');
            //return res.send(user);
        }
        else {
            res.send("Invalid");
        }
    });

});

app.get('/logout', function(req, res){
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/');
});

