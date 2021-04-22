import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAhzvwrj1pKDkc8s1-HGp5dcQnx5ZAPPo4",
    authDomain: "library-9f654.firebaseapp.com",
    projectId: "library-9f654",
    storageBucket: "library-9f654.appspot.com",
    messagingSenderId: "940772058958",
    appId: "1:940772058958:web:4fc3e03c9abe2c6870201f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore()