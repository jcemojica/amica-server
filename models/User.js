const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	/*basic details*/
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	about: { type: String, default: '' },
	birthday: { type: Date, default: null },

	/*settings*/
	isSearchable: { type: Boolean, default: true },
	canAcceptRequest: { type: Boolean, default: true },
	
	/*frenelyn*/
	friends: { type: Array, default: [] },
	isLoggedIn: { type: Boolean, default: false }
});

mongoose.model('User', UserSchema);