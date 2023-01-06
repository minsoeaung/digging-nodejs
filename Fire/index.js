import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import {applicationDefault} from "firebase-admin/app";

dotenv.config()

// Do this first to populate GOOGLE_APPLICATION_CREDENTIALS for current shell session
// export GOOGLE_APPLICATION_CREDENTIALS="/home/msa/Downloads/learn-firebase-5c8b1-firebase-adminsdk-gr4cm-ab73510d40.json"

admin.initializeApp({
    credential: applicationDefault()
});

const topic = 'all';

const message = {
    notification: {
        title: 'Message from node',
        body: 'hey there 🐸'
    },
    topic: topic
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
