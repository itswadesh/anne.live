const { FIREBASE_APP_ID = 'FIREBASE_APP_ID' } = process.env
const { FIREBASE_PROJECT_ID = 'litekart-a5cfb' } = process.env
const { FIREBASE_API_KEY = 'FIREBASE_API_KEY' } = process.env
const { FIREBASE_MESSAGING_SENDERID = 'FIREBASE_MESSAGING_SENDERID' } =
  process.env
export const firebaseConfig = {
  messaging: {
    createServiceWorker: true,
  },
  config: {
    apiKey: FIREBASE_API_KEY,
    authDomain: 'https://accounts.google.com/o/oauth2/auth',
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: '<storageBucket>',
    messagingSenderId: FIREBASE_MESSAGING_SENDERID,
    appId: FIREBASE_APP_ID,
    measurementId: '<measurementId>',
  },
  services: {
    messaging: true,
  },
}
