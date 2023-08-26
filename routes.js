const express = require('express')
const Ticket = require('./models/Ticket')
const router = express.Router()

router.get('/tickets', async (req, res) => {
    const tickets = await Ticket.find()
    res.send(tickets)
})

// router.post('/tickets', async (req, res) => {
//     const ticket = new Ticket({})
//     await ticket.save()
//     res.send(ticket)
// })

// router.post('/', (req, res) => {
//     const { sessionId, serviceCode, phoneNumber, text } = req.body;

//     if (text === "") {
//         // Prompt the user for their name
//         response = `CON Please enter your fullname (first 3 letters, space, and rest of name):`;
//     } else if (text.startsWith("CON")) {
//         // User responded with their name
//         const userInput = text.substring(4).trim(); // Remove "CON " from the response
        
//         if (/^[A-Za-z]{3}\s[A-Za-z\s]*$/.test(userInput)) {
//             // Valid name format
//             // const fullname = userInput;
            
//             // // Save the user's fullname to the database
//             // const user = new User({
//             //     phoneNumber: phoneNumber,
//             //     fullname: fullname
//             // });

//             try {
//                 // await user.save();
//                 response = `END Thank you, ${fullname}! Your fullname has been saved.`;
//             } catch (error) {
//                 response = `END Sorry, there was an error saving your information.`;
//             }
//         } else {
//             // Invalid name format
//             response = `END Invalid name format. Please follow the pattern: First 3 letters, space, and rest of name.`;
//         }
//     } else {
//         // Handle other cases or responses
//         // ...
//     }
    
//     res.set("Content-Type: text/plain")
//     res.send(response)
// })

// router.post("/", async (req, res) => {
//     const { sessionId, serviceCode, phoneNumber, text } = req.body;
//     let response = "";
//     let userData = {};

//     if (text === "") {
//         // Prompt the user for their fullname
//         response = `CON Please enter your fullname (first 3 letters, space, and rest of name):`;
//     } else if (text.startsWith("CON")) {
//         // User responded with their name
//         const userInput = text.substring(4).trim(); // Remove "CON " from the response
        
//         if (/^[A-Za-z]{3}\s[A-Za-z\s]*$/.test(userInput)) {
//             // Valid name format
//             userData.fullname = userInput;

//             // Prompt for date of birth
//             response = `CON Great, now please enter your date of birth (DD/MM/YYYY):`;
//         } else {
//             // Invalid name format
//             response = `END Invalid name format. Please follow the pattern: First 3 letters, space, and rest of name.`;
//         }
//     } else if (text.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
//         // User responded with date of birth
//         const dob = text;

//         if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) {
//             // Valid date of birth format
//             userData.dateofbirth = dob;

//             // Prompt for VIN
//             response = `CON Please enter your Voter's Identity Number (6 digits):`;
//         } else {
//             // Invalid date of birth format
//             response = `END Invalid date of birth format. Please use the format DD/MM/YYYY.`;
//         }
//     } else if (/^\d{6}$/.test(text)) {
//         // User responded with VIN
//         const vin = text;

//         if (/^\d{6}$/.test(vin)) {
//             // Valid VIN format
//             userData.vin = vin;

//             // Generate a random 5-digit token
//             const token = generateToken();

//             // Save the user's information to the database
//             // const user = new User({
//             //     phoneNumber: phoneNumber,
//             //     fullname: userData.fullname,
//             //     dateofbirth: userData.dateofbirth,
//             //     vin: userData.vin,
//             //     token: token
//             // });

//             try {
//                 await user.save();
//                 response = `END Thank you! Your information has been saved. Your unique token is ${token}. ${userData}`;
//             } catch (error) {
//                 response = `END Sorry, there was an error saving your information.`;
//             }
//         } else {
//             // Invalid VIN format
//             response = `END Invalid VIN format. Please use 6 digits.`;
//         }
//     } else {
//         // Handle other cases or responses
//         // ...
//     }

//     res.set("Content-Type: text/plain");
//     res.send(response);
// });

router.post('/', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body
    let response = ''
    let userData = {}

    console.log(req.body)

    if (text === '') {
        response = `CON Please enter your fullname:`
        // userData.fullname = extractAfterLastAsterisk(text)
        console.log(text)

    } else if (isValidNameFormat(text)) {
        response = `CON Great, now please enter your date of birth (DD/MM/YYYY):`
        userData.fullname = extractAfterLastAsterisk(text)
        console.log(text, userData)

    } else if (isValidDateFormat(extractAfterLastAsterisk(text))) {
        response = `CON Please enter your Voter's Identity Number (6 digits):`
        userData.dob = extractAfterLastAsterisk(text)
        console.log(text, userData)

    } else if (isValidVinFormat(extractAfterLastAsterisk(text))) {
        userData.vin = extractAfterLastAsterisk(text)
        console.log(text, userData)

        userData.token = generateToken()

        response = `END Thank you! ${userData}`

    } else {
        response = `END Invalid Input`
    }

    res.set("Content-Type: text/plain");
    res.send(response);
})

function isValidNameFormat(input) {
    return /^[A-Za-z]{3,}\s[A-Za-z\s]*$/.test(input);
}

function extractAfterLastAsterisk(inputString) {
    const lastIndex = inputString.lastIndexOf('*');
    if (lastIndex !== -1 && lastIndex < inputString.length - 1) {
        const substring = inputString.substring(lastIndex + 1);
        return substring.toLowerCase(); // Convert the substring to lowercase
    }
    return inputString.toLowerCase(); // Convert the whole string to lowercase
}

function isValidDateFormat(input) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(input);
}

function isValidVinFormat(input) {
    return /^\d{6}$/.test(input);
}

// Function to generate a random 5-digit token
function generateToken() {
    return Math.floor(10000 + Math.random() * 90000);
}


module.exports = router