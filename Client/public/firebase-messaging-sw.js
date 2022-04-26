/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"
  );
}
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBzf6b3AANoqRFIXGw1Azvr4fqb7mxH2_o",
  authDomain: "olympian-759e3.firebaseapp.com",
  databaseURL: "https://olympian-759e3.firebaseio.com",
  projectId: "olympian-759e3",
  storageBucket: "olympian-759e3.appspot.com",
  messagingSenderId: "683991385560",
  appId: "1:683991385560:web:59ff468a5c8c8ebb8a9ead",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  Notification(Content);
});
