import { db, auth } from '../firebaseSetup';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  return auth.currentUser;
};

const logout = () => {
  auth.signOut();
};

const trimData = (data) => {
  let newData = {};
  for (let key in data) {
    if (typeof data[key] === 'object') {
      trimData(data[key]);
    } else {
      if (data[key].trim() !== '') {
        newData[key] = data[key].trim();
      }
    }
  }
  return newData;
};

const has = (data, search) => {
  for (let key in data) {
    if (typeof data[key] === 'object') {
      has(data[key], search);
    } else {
      if (key === search) {
        return true;
      }
    }
  }
};

const database = {
  async fetchGroups() {
    const GroupsRef = collection(db, 'groups');
    const GroupsSnapshot = await getDocs(GroupsRef);
    const Groups = GroupsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return Groups;
  },

  async addGroup(data, auth) {
    if (!auth.currentUser)
      throw new Error('You must be logged in to create a group');

    const cleanData = trimData(data);
    if (Object.keys(cleanData) <= 0) throw new Error('No data provided');
    if (!has(cleanData, 'name')) throw new Error('Name is required');

    const roles = {
      owner: auth.currentUser.uid,
      admins: [],
      members: [auth.currentUser.uid],
    };

    const GroupRef = collection(db, 'groups');
    await addDoc(GroupRef, {
      ...data,
      ...roles,
    });
  },

  async deleteGroup(id) {
    if (!id) return new Error('No id provided');
    const GroupRef = collection(db, 'groups');
    await deleteDoc(doc(GroupRef, id));
  },

  async fetchGroupMessages(groupId) {
    const GroupMessagesRef = collection(db, 'groups', groupId, 'messages');
    const GroupMessagesSnapshot = await getDocs(GroupMessagesRef);
    const GroupMessages = GroupMessagesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return GroupMessages;
  },

  async addGroupMessage(groupId, data) {
    if (!data) return new Error('No data provided');

    const GroupMessagesRef = collection(db, 'groups', groupId, 'messages');
    await addDoc(GroupMessagesRef, {
      ...data,
    });
  },
};

export { logout, signInWithGoogle, database };
