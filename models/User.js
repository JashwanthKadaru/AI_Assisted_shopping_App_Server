import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userID: {type: String, unique: true},
  userName: {type: String, unique: true},
  userEmail: {type: String, unique: true},
  userFullName: {type: String, required: true},
  userPassword: {type: String, required: true},
  userPicture: String,
});

const User = mongoose.model('Users', userSchema, 'Users');

export default User;