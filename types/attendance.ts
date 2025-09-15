export interface Attendance {
  id?: string;
  classId: string;
  date: string;
  records: {
    [studentName: string]: AttendanceStatus;
  };
  markedBy: string;
}

export type AttendanceStatus = "present" | "absent" | "late";
export type AttendanceRecords = { [student: string]: AttendanceStatus };