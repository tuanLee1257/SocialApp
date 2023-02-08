import firebase from 'firebase/compat/app';
require('firebase/compat/auth');
require('firebase/compat/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBJLok85u-Y2UpRGLh8p4c2yXIT9FRWevg',
  authDomain: 'messagees-dfbd8.firebaseapp.com',
  projectId: 'messagees-dfbd8',
  storageBucket: 'messagees-dfbd8.appspot.com',
  messagingSenderId: '877598576307',
  appId: '1:877598576307:web:15d124cb17f633b93e2ac6',
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
firebase
  .firestore()
  .settings({experimentalForceLongPolling: true, merge: true}); //add this..

export const initFirebase = firebase;
export const auth = firebase.auth();
export const database = firebase.firestore();

// const analytics = getAnalytics(app);
