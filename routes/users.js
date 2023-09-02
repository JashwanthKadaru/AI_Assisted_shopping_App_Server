import express from 'express'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {insertUser, verifyUser} from '../utilities/User.js' 
import {createCart} from '../utilities/Cart.js'
import multer from 'multer';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img')); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


const router = express.Router();

// To verify Login
router.post("/login",async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try{
         const result = await verifyUser(username, password);
         if(result.success) {
            console.log("verification success.");
            console.log({success: result.success, username: result.verifiedUser.userName, fullname: result.verifiedUser.userFullName, email: result.verifiedUser.userEmail, profilePicturePath: result.verifiedUser.userPicture});
            res.json({success: result.success, username: result.verifiedUser.userName, fullname: result.verifiedUser.userFullName, email: result.verifiedUser.userEmail, profilePicturePath: result.verifiedUser.userPicture});
         } else {
            console.log("verification Failed.");
            res.json({success: result.success, username: null, fullname: null, email: null, profilePicturePath: null});
        }
    }catch(err){
        console.error(err);
        res.status(500).json();
    }
});


// To register users
router.post("/register",  upload.single('picture'), async(req, res) => {
    const params = req.body;
    const picture = req.file;
    
    try{
         if (!picture) {
            res.status(400).json({ success: false, errorMessage: 'No image uploaded' });
            return;
         }

        console.log('Uploaded image path:', picture.path);

        const imageFileName = picture.filename; 
        const imageDestination = path.join(__dirname, '../public/img', imageFileName); 
        console.log('Image destination filename:', imageFileName);
        fs.renameSync(picture.path, imageDestination);
        const picturePathInDB = imageFileName;

        const result = await insertUser(params.username, params.password, params.email, params.fullname, picturePathInDB);
        
        if(result.success) {
            console.log("\n\nnew User:\n",result.new_user);
            const result2 = await createCart(params.username);
            if(result2.success) {
                console.log("cart created:",result2);
                console.log("userEmail1234");
                console.log("userEmail", params.email);
                
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "smartfashionstoreorg@gmail.com",
                        pass: "uastycviqkjcncqj"
                    }
                });
                
                const mailOptions = {
                    from: 'smartfashionstoreorg@gmail.com',
                    to: `${params.email}`,
                    subject: 'Hello from Smart Fashion Store',
                    text: 
                    `
                    Dear ${params.fullname},
                    
                    You have successfully registered on our platform. Welcome aboard!!!
                    
                    With Regards,
                    Smart-Fashion-Store.org
                    `,
                };

                try {
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Email sent:', info.response);
                } catch (error) {
                    console.error('Error sending email:', error);
                }

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