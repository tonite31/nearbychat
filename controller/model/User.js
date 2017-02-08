var Schema = global.mongoose.Schema;
 
var User = new Schema({
    username: String,
    password: String,
    photoUrl: String,
    location: String
});
 
module.exports = mongoose.model('User', User);