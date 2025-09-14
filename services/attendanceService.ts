import { db } from "@/firebase";
import { Attendance } from "@/types/attendance";
import { addDoc, collection } from "firebase/firestore";

export const attendanceColRef = collection(db, "attendances");

export const createAttendance = async (attendanceData: Attendance) => {
    const docRef = await addDoc(attendanceColRef, attendanceData);
    return docRef.id;
}