import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCO8BDS0K2t6VbLSQ6qUtxSpCVVLiCgSjw',
  authDomain: 'react-native-product-d4bfe.firebaseapp.com',
  projectId: 'react-native-product-d4bfe',
  storageBucket: 'react-native-product-d4bfe.appspot.com',
  messagingSenderId: '350488544514',
  appId: '1:350488544514:web:7ccde15a6aa020467e6e1b',
  measurementId: 'G-VV7TKW2KTQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
