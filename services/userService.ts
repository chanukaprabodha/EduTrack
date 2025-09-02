import { db } from "@/firebase";
import { User } from "@/types/user";
import { addDoc, collection } from "firebase/firestore";

export const userColRef = collection(db, "users");

export const createUser = async (user: User) => {
  const docRef = await addDoc(userColRef, user);
  return docRef.id;
};