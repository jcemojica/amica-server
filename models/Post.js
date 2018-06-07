const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const PostSchema = new Schema({
	/*userid of the poster*/
	postAuthor: { type: Schema.Types.ObjectId, ref: 'User', required: true },

	/*if this attribute doesn't contain null, it means sa own wall siya nagpost, but if not then sa iba*/
	wallOwner: { type: Schema.Types.ObjectId, ref: 'User' },

	/*other details*/
	content: { type: String, default: '' },
	timestamp: { type: Date, default: Date.now }, //YYYY-mm-dd
	likes: { type: Array, default: [] }
});

mongoose.model('Post', PostSchema);