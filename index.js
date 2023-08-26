const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    // Read variables sent via POST from our SDK
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
  
    console.log('####################', req.body);
    let response = "";
  
    if (text === "") {
      console.log(text);
      // This is the first request. Note how we start the response with CON
      response = `CON What would you like to check
          1. My account
          2. My phone number`;
    } else if (text === "1") {
      // Business logic for first level response
      response = `CON Choose account information you want to view
          1. Account number
          2. Account balance`;
    } else if (text === "2") {
      // Business logic for first level response
      // This is a terminal request. Note how we start the response with END
      response = `END Your phone number is ${phoneNumber}`;
    } else if (text === "1*1") {
      // This is a second level response where the user selected 1 in the first instance
      const accountNumber = "ACC100101";
      // This is a terminal request. Note how we start the response with END
      response = `END Your account number is ${accountNumber}`;
    } else if (text === "1*2") {
      // This is a second level response where the user selected 1 in the first instance
      const balance = "KES 10,000";
      // This is a terminal request. Note how we start the response with END
      response = `END Your balance is ${balance}`;
    }
  
    // Print the response onto the page so that our SDK can read it
    res.set("Content-Type: text/plain");
    res.send(response);
    // DONE!!!
});

// const UssdMenu = require('ussd-builder');

// let menu = new UssdMenu();

// menu.startState({
//     run: () => {
//         // use menu.con() to send response without terminating session
//         menu.con('Welcome! Ready to register for the Zizi Conference:' +
//         '\n1. Get started' +
//         '\n2. Get out!');
//     },
//     // next object links to next state based on user input
//     next: {
//         '1': 'register',
//         '2': 'quit'
//     }
// });

// menu.state('register', {
//     run: () => {
//         menu.con('Before we go ahead, whats your name?');
//     },
//     next: {
//         '*[a-zA-Z]+': 'register.tickets'
//     }
// });

// menu.state('register.tickets', {
//     run: () => {
//         let name = menu.val;
//         dataToSave.name = name;
//         console.log(dataToSave);
//         menu.con('How many tickets would you like to reserve?');
//     },
//     next: {
//         // using regex to match user input to next state
//         '*\\d+': 'end'
//     }
// });

// menu.state('end', {
//     run: async () => {
//         let tickets = menu.val;
//         dataToSave.tickets = tickets;
//         console.log(dataToSave);

//     // Save the data
//     const data = new Model({
//         name: dataToSave.name,
//         tickets: dataToSave.tickets
//     });

//     const dataSaved = await data.save();
//         menu.end('Awesome! We have your tickets reserved. Sending a confirmation text shortly.');
//     }
// });

// menu.state('quit', {
//     run: () => {
//         menu.end("Goodbye :)");
//     }
// });

// // Registering USSD handler with Express
// router.post('/ussd', (req, res) => {
//     menu.run(req.body, ussdResult => {
//         res.send(ussdResult);
//     });
// });

// router.post('/', (req, res) => {
//     // const { sessionId, serviceCode, phoneNumber, text } = req.body;

//     console.log(req.body)
//     res.send('END Hello')
// })
  
module.exports = router;