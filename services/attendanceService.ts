import { db } from "@/firebase";
import { Attendance } from "@/types/attendance";
import { formattedDate } from "@/utils/dateFormat";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const attendanceColRef = collection(db, "attendances");

export const createAttendance = async (attendanceData: Attendance) => {
  const docRef = await addDoc(attendanceColRef, attendanceData);
  return docRef.id;
};

export const getAttendanceHistory = async (
    teacherId: string
): Promise<Attendance[]> => {
  try {
    const q = query(
      attendanceColRef,
      where("markedBy", "==", teacherId)
    );

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Attendance[];
  } catch (err) {
    console.error("Error fetching attendance:", err);
    throw err;
  }
};

export const getTodayAttendanceSummary = async (teacherId: string) => {
  try {
    const today = formattedDate();

    const q = query(
      attendanceColRef,
      where("markedBy", "==", teacherId),
      where("date", "==", today)
    );

    const snapshot = await getDocs(q);

    let present = 0;
    let absent = 0;
    let late = 0;

    snapshot.forEach((doc) => {
      const data = doc.data() as Attendance;
      Object.values(data.records).forEach((status) => {
        if (status === "present") present++;
        if (status === "absent") absent++;
        if (status === "late") late++;
      });
    });

    const total = present + absent + late;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, late, percentage };
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    return { present: 0, absent: 0, late: 0, percentage: 0 };
  }
};