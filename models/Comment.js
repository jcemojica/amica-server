const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	/*userid of the commentor*/
	commentAuthor: { type: Schema.Types.ObjectId, ref: 'User', required: true },

	/*id of the post where it was commented*/
	postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true},

	/*other info*/
	content: { type: String, default: '' },
	timestamp: { type: Date, default: Date.now }, //YYYY-mm-dd
	likes: { type: Array, default: [] }
});

mongoose.model('Comment', CommentSchema);
