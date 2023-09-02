import express from 'express';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import {retrievePurchasesList} from '../utilities/Purchases.js';
import {userPurchaseTransaction} from '../bussiness/userPurchaseTransaction.js';
const router = express.Router();

router.get("/user/:username", async (req, res) => {
    const username = req.params.username;
    
    try {
        const purchases = await retrievePurchasesList( username );

        if(purchases && purchases.length===0){
            console.log(`No purchases made by user with username: ${username}`);
            res.json({success: true, username: username, purchaseList: purchases});
        } else if(purchases && purchases.length!==0) {
            console.log(`Purchases List of length ${purchases.length} returned. username : ${username}`);
            res.json({success: true, username: username, purchaseList: purchases});
        } else {
            console.log(`Purchases List was not returned. Error occured. Returning empty list.`);
            res.json({success: false, username: username, purchaseList: []});
        }
    } catch(error) {
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})


router.post("/:username/transaction-started", async (req, res) => {
    const username = req.params.username;
    const userPurchaseList = req.body.userPurchaseList;
    try {
        const result = await userPurchaseTransaction(username, userPurchaseList);
        if(result.success) {
            console.log("Purchase successfull.");

            const user = await User.findOne({userName: username});

            const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: "smartfashionstoreorg@gmail.com",
                        pass: "uastycviqkjcncqj"
                    }
                });
                
                const mailOptions = {
                    from: 'smartfashionstoreorg@gmail.com',
                    to: `${user.userEmail}`,
                    subject: 'Purchase Success!!!',
                    text: 
                    `
Dear ${user.userFullName},

You have successfully Purchased the following items on our platform. Looking forward for more shopping with you!!!
                    
s.no.  ${"name".padEnd(35, ' ')}  qty  total
${userPurchaseList.map((item,index) => {return `${(index+1+" ").padEnd(5, ' ')}  ${item.productName.padEnd(35, ' ')}  ${item.cartQty}  ${item.cartQty*item.productPrice}\n`})}


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

            res.json(result);
        } else {
            console.log("Purchase failed.");
            res.json(result);
        }
    } catch(error) {
        console.log(error);
        res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
    }
})


export default router;

// router.post("/push", async (req, res) => {
//     const username = req.body.username;
//     const itemsList = req.body.itemsList;
    
//     try {
//         const purchase = await insertPurchase( username, itemsList );

//         if(purchase) {
//             console.log(`Purchase successful!\npurchase: ${purchase}`);
//             res.json({success: true, purchase: purchase});
//         } else {
//             res.json({success: false, purchase: purchase});
//         }
//     } catch(error) {
//         res.status(500).send(`An Internal Server Error occurred. We are sorry!`);
//     }
// })