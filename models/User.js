import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userID: String,
  userName: {type: String, unique: true},
  userEmail: String,
  userFullName: String,
  userPassword: String,
});

const User = mongoose.model('Users', userSchema, 'Users');

export default User;