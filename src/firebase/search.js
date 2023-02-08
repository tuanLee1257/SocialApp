import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {database} from './firebaseConfig';

var searchUser = [];
export const searchUserFirebase = (setSearchUer, inputSearch, user) => {
  if (inputSearch != null) {
    const collectionRef = collection(database, 'users');
    const q = query(
      collectionRef,
      where('username', '>=', inputSearch),
      where('username', '<=', inputSearch + '~'),
    );

    onSnapshot(q, snapShot => {
      snapShot.docs.map(doc =>
        searchUser.push({
          id: doc.id,
          uid: doc.data().uid,
          username: doc.data().username,
          profile_picture: doc.data().profile_picture,
        }),
      );
    });

    const users = [...searchUser];
    var filter = users.filter(item => item.uid != user.uid);

    setSearchUer(filter);
    searchUser = [];
  }
};
