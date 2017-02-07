var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var Post = new Schema({
    content: String,
    author: String,
    latLng : String,
    zone : Number,
    point: {type : Number, default: 0},
    published_date: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model('Post', Post);