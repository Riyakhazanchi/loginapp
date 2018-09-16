var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var userSchema = mongoose.Schema({
     name: String,
     email:String,
     username:String,
     password:String,
     password1: String
     });

var User =module.exports=mongoose.model('User',userSchema);

module.exports.createUser =function(newUser,callback)
{
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
       newUser.password=hash;
       newUser.save(callback);
    });
});

}