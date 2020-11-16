const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

require('dotenv').config();

require('./database/database');

const PORT = process.env.PORT || 5000;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


app.post('/register',async (req,res) => {
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
});


app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});