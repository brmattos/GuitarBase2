import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserProfile = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};a
