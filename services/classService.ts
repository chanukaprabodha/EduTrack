import { db } from "@/firebase";
import { Class } from "@/types/class";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const classColRef = collection(db, "classes");

export const getAllClassesByUserID = async (userId: string) => {
  const q = query(classColRef, where("teacherId", "==", userId));
  const querySnapshot = await getDocs(q);
  const classList = querySnapshot.docs.map((classRef) => ({
    id: classRef.id,
    ...classRef.data(),
  })) as Class[];
  return classList;
};

export const deleteClass = async (id: string) => {
  const docRef = doc(db, "classes", id);
  return await deleteDoc(docRef);
};

export const getClassById = async (id: string) => {
  const classDocRef = doc(db, "classes", id);
  const snapshot = await getDoc(classDocRef);
  const classData = snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Class)
    : null;
  return classData;
};

export const createClass = async (classData: Class) => {
  const docRef = await addDoc(classColRef, classData);
  return docRef.id;
};

export const updateClass = async (id: string, classData: Class) => {
  const docRef = doc(db, "classes", id);
  const { id: _id, ...classDataWithoutId } = classData;
  return await updateDoc(docRef, classDataWithoutId);
};

export const getClassesMap = async (): Promise<Record<string, Class>> => {
  const snap = await getDocs(collection(db, "classes"));

  const map: Record<string, Class> = {};
  snap.docs.forEach((doc) => {
    map[doc.id] = { id: doc.id, ...(doc.data() as Class) };
  });

  return map;
};
