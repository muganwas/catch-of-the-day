import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyB6e-jtEkHDVpTedz57fAt6kz8bwXJPl_w",
    authDomain: "ikumbya-fish-market.firebaseapp.com",
    databaseURL: "https://ikumbya-fish-market.firebaseio.com",
    projectId: "ikumbya-fish-market",
    storageBucket: "ikumbya-fish-market.appspot.com",
    messagingSenderId: "475088957109"
};
firebase.initializeApp(config);
export default firebase;
