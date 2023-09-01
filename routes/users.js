import express from 'express'
import {insertUser, verifyUser} from '../utilities/User.js' 
import {createCart} from '../utilities/Cart.js'
const router = express.Router();

// To verify Login
router.post("/login",async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try{
         const result = await verifyUser(username, password);
         if(result.success) {
            console.log("verification success.");
            console.log({success: result.success, username: result.verifiedUser.userName, fullname: result.verifiedUser.userFullName, email: result.verifiedUser.userEmail});
            res.json({success: result.success, username: result.verifiedUser.userName, fullname: result.verifiedUser.userFullName, email: result.verifiedUser.userEmail});
         } else {
            console.log("verification Failed.");
            res.json({success: result.success, username: null, fullname: null, email: null});
        }
    }catch(err){
        console.error(err);
        res.status(500).json();
    }
})


// To register users
router.post("/register", async(req, res) => {
    const params = req.body;
    
    try{
        const result = await insertUser(params.username, params.password, params.email, params.fullname, params.picture);

        if(result.success) {
            console.log("\n\nnew User:\n",result.new_user);
            const result2 = await createCart(params.username);
            if(result2.success) {
                console.log("cart created:",result2);
                res.json({success: true, userId: newUser.userID});
            } else {
                console.log("cart created:",result2);
                res.json({success: false, errorMessage: "Failed to create cart."});
            }
        } else {
            console.log("cart created:",result);
            res.json({success: false, errorMessage: "Failed to create user."});
        }
    } catch(error) {
        res.status(500).json();
    }
})


export default router;