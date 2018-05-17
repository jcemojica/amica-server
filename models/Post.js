const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const PostSchema = new Schema({
	/*userid of the poster*/
	postAuthor: { type: ObjectIdSchema, default: function() { return new ObjectId()} },

	/*if this attribute doesn't contains null, it means sa own wall siya nagpost, but if not then sa iba*/
	wallOwner: { type: ObjectIdSchema, default: function() { return null } },

	/*other details*/
	content: { type: String, default: '' },
	timestamp: { type: Date, default: Date.now }, //YYYY-mm-dd
	likes: { type: Number, default: '' }
});

mongoose.model('Post', PostSchema);