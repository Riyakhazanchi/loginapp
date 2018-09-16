var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var path = require('path');
var app = express();
var ejs = require('ejs')
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://node:nodejs1@ds135196.mlab.com:35196/node')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
});
// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

var userSchema = mongoose.Schema({
     name: String,
     rollno:String,
     branch:String, 
     year:String,
     email: String,
     phone:String,
     hackerearthprofile:String,
     codechefprofile:String,
     spojprofile:String,
     opensourcelinks:String,
     otherprofiles:String,
     project:String
});

var User = mongoose.model('User',userSchema);

app.get('/',function (req,res){
	console.log("welcome");
	res.sendFile(__dirname+'./manthan4.html');  
})


app.post('/data',function(req,res){
	var f_name = req.body.name;
	var f_rollno=req.body.rollno;
	var f_branch=req.body.branch;
	var f_year=req.body.year;
	var f_email=req.body.email;
	var f_phone= req.body.phone;
	var f_hackerearthprofile=req.body.hackerearthprofile;
	var f_codechefprofile=req.body.codechefprofile;
	var f_spojprofile=req.body.spojprofile;
	var f_opensourcelinks=req.body.opensourcelinks;
	var f_otherprofiles=req.body.otherprofiles;
	var f_project=req.body.project;
	
	var user = new User({ name: f_name,rollno:f_rollno,branch:f_branch,year:f_year, email: f_email,phone:f_phone,hackerearthprofile:f_hackerearthprofile,codechefprofile:f_codechefprofile,spojprofile:f_spojprofile,opensourcelinks:f_opensourcelinks,otherprofiles:f_otherprofiles,project:f_project});
	user.save(function(err,data){
		if(err) return console.error(err);
		console.log(data);
	});

	res.send("Data Collected");


var persons=[req.body.email];
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'riyakhazanchi8@gmail.com',
    pass: 'password@'
  }
});

var mailOptions = {
  from: 'riyakhazanchi8@gmail.com',
  to: persons,
  subject: 'abc',
  text: 'abc'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


});


app.get('/*',function (req,res){
	res.send('404 Error');
});


app.listen('3000');