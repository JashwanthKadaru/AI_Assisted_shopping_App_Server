import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userID: {type: String, unique: true},
  userName: {type: String, unique: true},
  userEmail: String,
  userFullName: String,
  userPassword: String,
  userPicture: String,
});

const User = mongoose.model('Users', userSchema, 'Users');

export default User;