import mongoose from "mongoose";
import User from '../models/User.js'
import { v4 as uuidv4} from 'uuid';


const insertUser = ( username, password, email, fullname) => {
    const userId = uuidv4();
    const newUser = new User({
        userID: userId,
        userName: "jashwanth_kadaru",
        userEmail: "Jashwanth.Kadaru095@iiitb.ac.in",
        userFullName: "Jashwanth Kadaru",
        userPassword: "Buy@1234",
    });

    newUser.save()
    .then((user) => {
        console.log('User created:', user);
    })
    .catch((err) => {
        console.error('Error creating user:', err);
    });
} 

const verifyUser = ( username, password) => {
    let verifiedUser= null;
    User.findOne({userName:username, userPassword:password})
    .then((user) => {
        if (user) {
            console.log('User found:', user);
            verifiedUser = user.toJSON();
            console.log(verifiedUser)
        } else {
            console.log('User not found');
            verifiedUser = null;
        }
    })
    .catch((err) => {
        console.error('Error finding user:', err);
    })
    .finally(() => {
        return verifiedUser;
    })  

    console.log(verifiedUser);
    return verifiedUser;    
} 

export default {insertUser, verifyUser};