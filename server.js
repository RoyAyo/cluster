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
            status: "pending",
            merge_fields: {
                FNAME: subscribingUser.firstName
            }
        });

        console.log(response);

        res.json({
            success: true,
            msg : 'Successfully added the users'
        });
    } catch (e) {
        res.status(500).json({
            success: true,
            msg : 'Successfully added the users'
        });
    }
});


app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});