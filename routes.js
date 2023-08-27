const express = require('express');
const Ticket = require('./models/Ticket');
const Africastalking = require('africastalking');

require("dotenv").config();

const router = express.Router();
const API_KEY = process.env.AT_SANDBOX_APIKEY;
const USERNAME = process.env.AT_SANDBOX_USERNAME;
const credentials = {
    apiKey: API_KEY,
    username: USERNAME,
};
const sms = Africastalking(credentials).SMS;

router.get('/tickets', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.send(tickets);
    } catch (error) {
        res.status(500).send("Error fetching tickets");
    }
});

router.post('/', async (req, res) => {
    const { text } = req.body;
    let response = '';
    let userData = {};

    if (textb === '') {
        response = `CON Please enter your fullname:`;

    } else if (isValidNameFormat(text)) {
        response = `CON Great, now please enter your date of birth (DD/MM/YYYY):`;
        userData.fullname = extractAfterLastAsterisk(text);

    } else if (isValidDateFormat(extractAfterLastAsterisk(text))) {
        response = `CON Please enter your Voter's Identity Number (6 digits):`;
        userData.dob = extractAfterLastAsterisk(text);

    } else if (isValidVinFormat(extractAfterLastAsterisk(text))) {
        userData.vin = extractAfterLastAsterisk(text);
        userData.token = generateToken();

        const ticket = new Ticket({
            fullname: userData.fullname,
            dateofbirth: userData.dob,
            vin: userData.vin,
            token: userData.token
        });

        try {
            await ticket.save();
            const options = {
                to: ['+23409076222676'], // Update with the actual phone number
                message: `Congrats! your palliative ticket number is: ${userData.token}`
            };

            sms.send(options)
                .then(response => console.log(response))
                .catch(error => console.log(error));

            response = `END Thank you! You will receive an SMS with your palliative ticket number`;

        } catch (error) {
            response = `END Error while processing your request`;
        }
    } else {
        response = `END Invalid Input`;
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

function isValidNameFormat(input) {
    return /^[A-Za-z]{3,}\s[A-Za-z\s]*$/.test(input);
}

function extractAfterLastAsterisk(inputString) {
    const lastIndex = inputString.lastIndexOf('*');
    if (lastIndex !== -1 && lastIndex < inputString.length - 1) {
        const substring = inputString.substring(lastIndex + 1);
        return substring.toLowerCase();
    }
    return inputString.toLowerCase();
}

function isValidDateFormat(input) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(input);
}

function isValidVinFormat(input) {
    return /^\d{6}$/.test(input);
}

function generateToken() {
    return Math.floor(10000 + Math.random() * 90000);
}

module.exports = router;
