import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBMsVXf7z5lLU0iGCoJacLCo5LBMA2WT4I",
    authDomain: "crown-db-4fe91.firebaseapp.com",
    databaseURL: "https://crown-db-4fe91.firebaseio.com",
    projectId: "crown-db-4fe91",
    storageBucket: "crown-db-4fe91.appspot.com",
    messagingSenderId: "304034886256",
    appId: "1:304034886256:web:572a45ff2773774c5bbab5",
    measurementId: "G-WSP1FW8NC1"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef= firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error user auth ', error.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore =  firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;