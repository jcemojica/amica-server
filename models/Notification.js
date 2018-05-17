const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const NotificationSchema = new Schema({
	actor: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	receiver: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	verb: { type: String, default: '' }, //commented, requested, posted, liked
	
	//these ids might contain null if not applicable to the verb
	postid: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	commentid: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	requestid: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	likeid: { type: ObjectIdSchema, default: function() {return new ObjectId()} }
});

mongoose.model('Notification', NotificationSchema);
