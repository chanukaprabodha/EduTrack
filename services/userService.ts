import { db } from "@/firebase";
import { User } from "@/types/user";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const userColRef = collection(db, "users");

export const createUser = async (user: User) => {
  const docRef = await addDoc(userColRef, user);
  return docRef.id;
};

export const getUserById = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const snapshot = await getDoc(userDocRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as User;
  }

  const q = query(collection(db, "users"), where("id", "==", uid));
  const querySnap = await getDocs(q);

  if (!querySnap.empty) {
    const docSnap = querySnap.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  console.log("No user found for uid:", uid);
  return null;
};
