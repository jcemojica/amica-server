const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const CommentSchema = new Schema({
	/*userid of the commentor*/
	commentAuthor: { type: ObjectIdSchema, default: function() {return new ObjectId()} },

	/*id of the post where it was commented*/
	postId: { type: ObjectIdSchema, default: function() {return new ObjectId()} },

	/*other info*/
	content: { type: String, defualt: '' },
	timestamp: { type: Date, default: Date.now }, //YYYY-mm-dd
	likes: { type: Array, default: [] }
});

mongoose.model('Comment', CommentSchema);
