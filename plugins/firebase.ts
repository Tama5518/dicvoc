import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBigoXGLfoxU9lQR8fL2XSpdY00wt39xMw",
    authDomain: "dicvoc.firebaseapp.com",
    projectId: "dicvoc",
    storageBucket: "dicvoc.appspot.com",
    messagingSenderId: "864694535850",
    appId: "1:864694535850:web:442c7265f53da51df772d3"
  })
}

export default firebase
