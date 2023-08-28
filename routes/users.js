import express from 'express'
import userFunc from '../utilities/User.js' 

const router = express.Router();

// To verify Login
router.post("/smartfashionstore/login",(req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    const user = userFunc.verifyUser(username, password);

    res.send(`Message from server: The user is ${JSON.parse(user)}`);
})


// To register users
router.post("/smartfashionstore/register",(req, res) => {
    const params = req.body;
    
    res.send(`Message from server: The username u sent is ${params.username}, and password is ${params.password}, and fullname is ${params.fullname}, and email is ${params.email}, and ${params.picture}`)

})


export default router;