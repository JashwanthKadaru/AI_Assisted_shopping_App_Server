import express from 'express'
import {insertUser, verifyUser} from '../utilities/User.js' 

const router = express.Router();

// To verify Login
router.post("/login",async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    let user = null;
    try{
         user = await verifyUser(username, password);
         console.log(user);
    }catch(err){
        console.error(err);
        res.status(500).json();
    }
    
    res.json(user);
})


// To register users
router.post("/register", async(req, res) => {
    const params = req.body;
    
    try{
        const newUser = await insertUser(params.username, params.password, params.email, params.fullname, params.picture);

        if(newUser) {
            console.log("\n\nnew User:\n",newUser);
            res.json({success: true, userId: newUser.userID});
        } else {
            res.json({success: false, userId: null});
        }
    } catch(error) {
        res.status(500).json();
    }
})


export default router;