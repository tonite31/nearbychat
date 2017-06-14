var Schema = global.mongoose.Schema;
 
var Point = new Schema({
	postId: String,
    point: Number,
    author: String,
    isOwn: Boolean
});
 
module.exports = mongoose.model('Point', Point);