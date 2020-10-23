const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello from Firebase!");
 });


// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: req.body.row});
    // Send back a message that we've succesfully written the message
    //res.json({result: `Message with ID: ${writeResult.id} added.`});
    res.json({result: writeResult.id  });
  });

  exports.printIt = functions.https.onRequest(async (httpReq, response) =>{
    response.json({row:httpReq.body.row});
})
exports.printIt2 = functions.region('europe-west2').https.onRequest(async (httpReq, response) =>{
    response.json({text: "ASD WDFSD df"});
})
exports.printIt3 = functions.region('europe-west3').https.onRequest(async (httpReq, response) =>{
    response.json({text: "ASD WDFSD df"});
})
exports.printIt4 = functions.region('europe-west6').https.onRequest(async (httpReq, response) =>{
    response.json({text: "ASD WDFSD df"});
})