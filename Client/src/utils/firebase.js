import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import axios from "axios";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzf6b3AANoqRFIXGw1Azvr4fqb7mxH2_o",
  authDomain: "olympian-759e3.firebaseapp.com",
  databaseURL: "https://olympian-759e3.firebaseio.com",
  projectId: "olympian-759e3",
  storageBucket: "olympian-759e3.appspot.com",
  messagingSenderId: "683991385560",
  appId: "1:683991385560:web:59ff468a5c8c8ebb8a9ead",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BGEyvpUnppW8AcFP4gDRk5comTusVjpn3CpurtxReky3UxDQlVQamZEq_kXXBWkZVd-h3VgbDnnEtN6foowvwoE",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        axios.post(process.env.REACT_APP_API_URL + "firebase/add", {
          token: currentToken,
        });
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
