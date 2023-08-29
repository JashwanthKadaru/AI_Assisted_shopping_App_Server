import mongoose from "mongoose";
import User from '../models/User.js'
import { v4 as uuidv4} from 'uuid';


// For register page
export async function insertUser( username, password, email, fullname, picture) {
    // generates universally unique key that is never generated again.
    const userId = uuidv4();

    // creating a new user documnet 
    const newUser = new User({
        userID: userId,
        userName: username,
        userEmail: email,
        userFullName: fullname,
        userPassword: password,
        userPicture: picture,
    });

    // inserting the new user document into user collection.
    // asynchronous operation, hence await is used and promises are generated.
    try{
        const user = await newUser.save();
        
        const date = new Date();

        // if user successfully inserted, then
        if(user) {
            console.log(`Register route was hit. A new user was inserted.\nTime of insertion of user: ${date.toISOString()}\nUser document inserted: ${user}`);
            return user;
        } else { // otherwise
            console.log(`User not inserted. Check problem.`);   
            return user;
        }
    } catch(error) {
        // if insertion fails and throws an error
        console.log(`Register route was hit. Failed to add new user.\n Error info: ${error}`);
        throw error;
    }
} 


// For Login page
export async function verifyUser(username, password) {
  let verifiedUser = { name: 'user' };

  try {
    // find user with given credentials
    const user = await User.findOne({ userName: username, userPassword: password });
    
    const date = new Date();

    // if verification success then,
    if (user) {
      console.log(`Login route was hit. A user credentials were verified.\nTime of verification success: ${date.toISOString}.\nUser credentials: username: ${username} password: ${password}`);
      verifiedUser = user;
    } else { // otherwise
      console.log(`Login route was hit. User credentials verification failed.\n Time of verification failure: ${date.toISOString()}`);
      verifiedUser = null;
    }

    console.log("finally:" + verifiedUser);
    return verifiedUser;
  } catch (error) { // if throws error
    console.error('Login route was hit. Failed to verify credentials.\n Error thrown:', error);
    throw error; // re-throw error 
  }
}
