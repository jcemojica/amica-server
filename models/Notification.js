const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
	actor: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	verb: { type: String, required: true }, //commented, requested, posted, liked
	
	//these ids might contain nothing if not applicable to the verb
	postid: { type: Schema.Types.ObjectId, ref: 'Post' },
	commentid: { type: Schema.Types.ObjectId, ref: 'Comment' },
	requestid: { type: Schema.Types.ObjectId, ref: 'FriendRequest' },
	isRead: { type: Boolean, default: false, required: true }
});

mongoose.model('Notification', NotificationSchema);
