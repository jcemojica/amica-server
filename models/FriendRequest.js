const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
	/*userid to whom the friend request was sent*/
	receiver: { type: Schema.Types.ObjectId, ref: 'User' },

	/*userid of sender*/
	requester: { type: Schema.Types.ObjectId, ref: 'User' },
	
	/*status of the request*/
	isAccepted: { type: Boolean, default: false }
});

mongoose.model('FriendRequest', FriendRequestSchema);