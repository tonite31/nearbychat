var Schema = global.mongoose.Schema;
 
var Comment = new Schema({
	postId: String,
    content: String,
    author: String,
    published_date: { type: Date, default: Date.now },
    isOwn: Boolean
});
 
module.exports = mongoose.model('Comment', Comment);