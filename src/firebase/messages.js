import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import {getContact} from './channels';
import {database} from './firebaseConfig';

export const getDocbyID = async docId => {
  const docRef = doc(database, 'users', docId);
  return getDoc(docRef).then(snap => {
    if (!snap.exists()) throw new Error('not-found');
    return snap.data();
  });
};

export const sendMessage = (messages = [], contact) => {
  const messageDoc = database
    .collection('channels')
    .doc(contact.contactId)
    .collection('messages')
    .doc();
  setDoc(messageDoc, messages[0]);
};

export const getMessages = (setMessages, contact) => {
  const collectionRef = collection(
    database,
    'channels/' + contact.contactId + '/messages',
  );
  const q = query(collectionRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, snapShot => {
    setMessages(
      snapShot.docs.map(doc => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().user._id,
          avatar: doc.data().user.avatar,
        },
      })),
    );
  });
  return unsubscribe;
};

export const getContactInfo = (contact, user) => {
  const contactUID = removeItemOnce([...contact.members], user.uid);
  const collectionRef = collection(database, 'users');
  const q = query(collectionRef, where('uid', '==', contactUID));

  console.log(contact);
};

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr[0];
}
