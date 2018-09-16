var express=require('express');
var router=express.Router();

var User=require('../models/user');
//get homepage
router.get('/register',function (req,res) {
 res.render('register');
});

router.get('/login',function (req,res) {
 res.render('login');
});


router.post('/register',function (req,res) {
    var name = req.body.name;
	var email=req.body.email;
	var username=req.body.username;
	var password=req.body.password;
	var password1=req.body.password1;

	//validation
	req.assert('name','Name is required').notEmpty();
	req.assert('email','email is required').notEmpty();
	req.assert('email','email is required').isEmail();
	req.assert('username','username is required').notEmpty();
	req.assert('password','passwordis required').notEmpty();
	req.assert('password1','password donot match').equals(req.body.password);

	var errors=req.validationErrors();
	if(errors)
	{
		res.render('register',{
			errors:errors
		})
	}
	else
	{
		var newUser=new User({
			name:name,
			email:email,
			username:username,
			password:password,
			password1:password1


		});
		User.createUser(newUser,function(err,user){
			if(err)throw err;
			console.log(user);
		});
	 res.redirect('/users/login');
	}
});
module.exports=router;