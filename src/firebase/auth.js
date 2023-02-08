import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {getAuth, updateProfile} from 'firebase/auth';

import {auth, database, initFirebase} from './firebaseConfig';

export const setUserInfomation = async (uid, setUser) => {
  if (uid != null) {
    const collectionRef = collection(database, 'users');
    const q = query(collectionRef, where('uid', '==', uid));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setUser(
        querySnapshot.docs.map(doc => ({
          uid: doc.data().uid,
          profile_picture: doc.data().profile_picture,
          username: doc.data().username,
        }))[0],
      );
    });
    return unsubscribe;
  }
};

export const onLogin = async (email, password) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch(error => {
      alert(error.message);
    });
};

export const onSignup = async (email, password, username) => {
  try {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);

    const photoURL = await getRandomProfilePic();

    await updateProfile(authUser.user, {
      displayName: username,
      photoURL: photoURL,
    })
      .then(() => console.log(authUser.user.photoURL))
      .catch(error => console.log(error.message));

    database.collection('users').doc(authUser.user.uid).set({
      uid: authUser.user.uid,
      username: authUser.user.displayName,
      profile_picture: authUser.user.photoURL,
      createAt: initFirebase.firestore.FieldValue.serverTimestamp(),
      status: 'active',
    });
  } catch (error) {
    console.log(error.message);
  }
};

const getRandomProfilePic = async () => {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const picture = data.results[0].picture.large;
  return picture;
};
