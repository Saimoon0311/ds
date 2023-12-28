// import { initializeApp } from "firebase/app";
// import { Firestore } from "firebase/firestore";

// let config = {
//   apiKey: "AIzaSyCYtz53UDjnL1Sxvvvj0trjYpkYu2yc_8w",
//   authDomain: "simplawfy-eb7b9.firebaseapp.com",
//   projectId: "simplawfy-eb7b9",
//   storageBucket: "simplawfy-eb7b9.appspot.com",
//   messagingSenderId: "121685485242",
//   appId: "1:121685485242:web:4668ea675f42110f49c483"
// };

// initializeApp(config);

// export default Firestore;





import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCYtz53UDjnL1Sxvvvj0trjYpkYu2yc_8w",
    authDomain: "simplawfy-eb7b9.firebaseapp.com",
    projectId: "simplawfy-eb7b9",
    storageBucket: "simplawfy-eb7b9.appspot.com",
    messagingSenderId: "121685485242",
    appId: "1:121685485242:web:4668ea675f42110f49c483"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
const db = getFirestore(firebaseApp);


export { db , messaging };