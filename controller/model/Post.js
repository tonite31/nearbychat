var Schema = global.mongoose.Schema;
 
var Post = new Schema({
	subject: String,
    content: String,
    author: String,
    published_date: { type: Date, default: Date.now },
    isOwn: Boolean
});
 
module.exports = mongoose.model('Post', Post);