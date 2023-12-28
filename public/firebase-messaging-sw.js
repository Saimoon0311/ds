importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCYtz53UDjnL1Sxvvvj0trjYpkYu2yc_8w",
    authDomain: "simplawfy-eb7b9.firebaseapp.com",
    projectId: "simplawfy-eb7b9",
    storageBucket: "simplawfy-eb7b9.appspot.com",
    messagingSenderId: "121685485242",
    appId: "1:121685485242:web:4668ea675f42110f49c483"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });