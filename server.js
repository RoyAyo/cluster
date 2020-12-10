const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us4"
});


app.post('/register',async (req,res) => {
    try {
        const listId = process.env.AUDIENCE_ID;
        const subscribingUser = {
        firstName: req.body.name,
        email: req.body.email
        };
        
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName
            }
        })
        .catch(e => {
            return res.status(400).json({
                success: false,
                msg : 'User already a member'
            });
        });
        res.json({
            success: true,
            msg : 'Successfully added the user'
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            msg : e.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});