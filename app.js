var express=require('express');
var path=require('path');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var exphbs=require('express-handlebars');
var expressValidator=require('express-validator');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var mongo=require('mongodb');
var mongoose=require('mongoose');
mongoose.connect('mongodb://nodejs1:nodejs1@ds135196.mlab.com:35196/node', { useNewUrlParser: true });
var db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
});


var routes= require('./routes/index');
var users=require('./routes/users');

//init app
var app=express();

//view engine
app.set('views',path.join(__dirname,'/views'));
app.engine('handlebars',exphbs({defaultlayout:'layout.handlebars'}));
app.set('view engine','handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
 

//set static folder
 app.use(express.static(path.join(__dirname,'public')));


//express session
 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//pssport init
app.use(passport.initialize());
app.use(passport.session());

 app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


 ////connect flash
 app.use(flash());

//global var
 app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error=req.flash('error');
    next();
});


app.use('/index',routes);
app.use('/users',users);



app.get('/*',function (req,res){
	res.send('404 Error');
});


app.listen('3000');