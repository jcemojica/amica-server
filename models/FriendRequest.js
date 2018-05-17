const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const FriendRequestSchema = new Schema({
	/*userid to whom the friend request was sent*/
	user: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	
	/*userid of sender*/
	requester: { type: ObjectIdSchema, default: function() {return new ObjectId()} },
	
	/*status of the request*/
	isAccepted: { type: Boolean, default: false }
});

mongoose.model('FriendRequest', FriendRequestSchema);