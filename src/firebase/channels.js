import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import {database, initFirebase} from './firebaseConfig';

export const addContact = (contact, user) => {
  const doc = database.collection('channels').doc();
  doc.set({
    id: doc.id,
    image: contact.profile_picture,
    name: contact.username,
    members: [contact.uid, user.uid],
    createAt: initFirebase.firestore.FieldValue.serverTimestamp(),
  });
  console.log('succes');
};

export const getContact = (setContacts, user) => {
  const collectionRef = collection(database, 'channels');
  const q = query(collectionRef, where('members', 'array-contains', user.uid));

  onSnapshot(q, snapShot => {
    setContacts(
      snapShot.docs.map(doc => ({
        contactId: doc.id,
        createAt: doc.data().createAt,
        // owner:doc.data().owner,
        // type:doc.data().type,
        username: doc.data().name,
        profile_picture: doc.data().image,
        members: doc.data().members,
      })),
    );
  });
};

export async function getContactInfo(members, user) {
  const uid = removeItemOnce([...members], user.uid);
  const docRef = doc(database, 'users', uid);
  const docSnap = await getDoc(docRef);
  return {
    uid: docSnap.data().uid,
    username: docSnap.data().username,
    profile_picture: docSnap.data().profile_picture,
  };
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr[0];
}
