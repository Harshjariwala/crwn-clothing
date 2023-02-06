// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDUCuuzD51t56Lw0IIkMXnVY5CHA5jbxk",
  authDomain: "crwn-clothing-db-4b17c.firebaseapp.com",
  projectId: "crwn-clothing-db-4b17c",
  storageBucket: "crwn-clothing-db-4b17c.appspot.com",
  messagingSenderId: "989026908463",
  appId: "1:989026908463:web:b487f026a5bc4e03b749da"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc (userDocRef,{displayName, email, createdAt});
        }catch(error){
            console.log('Error creating the user', error.message);
        }
    }
    return userDocRef;
}
