import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BookOpen, Calendar, CalendarDays, Clock, Users } from 'lucide-react-native';
import { Attendance } from '@/types/attendance';
import { useAuth } from '@/context/AuthContext';
import { getAttendanceHistory } from '@/services/attendanceService';
import { Class } from '@/types/class';
import { useLoader } from '@/context/LoaderContext';
import { getClassesMap } from '@/services/classService';

const AttendanceRecordsScreen = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const { hideLoader, showLoader } = useLoader();
  const [classesMap, setClassesMap] = useState<Record<string, Class>>({});

  useEffect(() => {
    const load = async () => {
      showLoader();
      try {
        if (!user?.uid) return;

        // fetch both
        const [attendanceData, classData] = await Promise.all([
          getAttendanceHistory(user.uid),
          getClassesMap(),
        ]);

        setRecords(attendanceData);
        setClassesMap(classData);
      } catch (err) {
        console.error("Error loading history:", err);
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    load();
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Enhanced Header with Icon */}
      <View className=" px-6 py-4 ">
        <View className="flex-row items-center mb-2">
          <Text className="text-2xl font-bold text-slate-800">Attendance History</Text>
        </View>
        <Text className="text-slate-500 text-sm ">Track student attendance across all classes</Text>
      </View>

      <ScrollView className="flex-1 px-6 py-4" showsVerticalScrollIndicator={false}>
        {records.length > 0 ? (
          records.map((rec) => {
            const classInfo = classesMap[rec.classId];
            const attendanceStats = Object.values(rec.records);
            const presentCount = attendanceStats.filter(s => s === 'present').length;
            const absentCount = attendanceStats.filter(s => s === 'absent').length;
            const lateCount = attendanceStats.filter(s => s === 'late').length;

            return (
              <View
                key={rec.id}
                className="bg-white rounded-2xl mb-4 shadow-lg border border-slate-100 overflow-hidden"
              >
                {/* Card Header Section */}
                <View className="bg-slate-50 px-5 py-4 border-b border-slate-100">
                  <View className="flex-row items-center mb-3">
                    <View className={`bg-orange-300 p-2 rounded-lg mr-3`}>
                      <BookOpen size={18} className="text-indigo-600" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-slate-900 font-bold text-lg">
                        {classInfo ? classInfo.name : `Class ${rec.classId}`}
                      </Text>
                      <Text className="text-slate-600 text-sm font-medium">
                        {classInfo ? classInfo.grade : 'Unknown Grade'}
                      </Text>
                    </View>
                  </View>

                  {/* Date with Icon */}
                  <View className="flex-row items-center mb-3">
                    <Clock size={14} className="text-slate-400 mr-2" />
                    <Text className="text-slate-600 text-sm font-medium ml-2">{rec.date}</Text>
                  </View>

                  {/* Quick Stats Pills */}
                  <View className="flex-row flex-wrap gap-2">
                    <View className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <Text className="text-emerald-700 text-xs font-semibold">{presentCount} Present</Text>
                    </View>
                    {absentCount > 0 && (
                      <View className="bg-red-50 px-3 py-1 rounded-full border border-red-200">
                        <Text className="text-red-700 text-xs font-semibold">{absentCount} Absent</Text>
                      </View>
                    )}
                    {lateCount > 0 && (
                      <View className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <Text className="text-amber-700 text-xs font-semibold">{lateCount} Late</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Student List Section */}
                <View className="p-5">
                  <View className="flex-row items-center mb-4">
                    <Users size={16} className="text-slate-500 mr-2" />
                    <Text className="text-slate-700 font-semibold">Students ({Object.keys(rec.records).length})</Text>
                  </View>

                  {Object.entries(rec.records).map(([student, status], index) => (
                    <View
                      key={student}
                      className={`flex-row items-center justify-between py-3 ${index < Object.entries(rec.records).length - 1 ? 'border-b border-slate-100' : ''
                        }`}
                    >
                      {/* Student Info */}
                      <View className="flex-row items-center flex-1">
                        <View className="bg-slate-100 w-9 h-9 rounded-full items-center justify-center mr-3">
                          <Text className="text-slate-600 font-semibold text-sm">
                            {student.split(' ').map(n => n[0]).join('')}
                          </Text>
                        </View>
                        <Text className="text-slate-800 font-medium flex-1">{student}</Text>
                      </View>

                      {/* Status Badge */}
                      <View
                        className={`px-3 py-1 rounded-full ${status === "present"
                            ? "bg-emerald-50 border border-emerald-200"
                            : status === "absent"
                              ? "bg-red-50 border border-red-200"
                              : "bg-amber-50 border border-amber-200"
                          }`}
                      >
                        <Text
                          className={`font-semibold text-xs capitalize ${status === "present"
                              ? "text-emerald-700"
                              : status === "absent"
                                ? "text-red-700"
                                : "text-amber-700"
                            }`}
                        >
                          {status}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            );
          })
        ) : (
          /* Enhanced Empty State */
          <View className="flex-1 items-center justify-center py-20">
            <View className="bg-slate-100 w-20 h-20 rounded-full items-center justify-center mb-4">
              <Calendar size={32} className="text-slate-400" />
            </View>
            <Text className="text-slate-800 font-bold text-xl mb-2">No Attendance Records</Text>
            <Text className="text-slate-500 text-center px-8 leading-6">
              Attendance records will appear here once you start taking attendance for your classes.
            </Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AttendanceRecordsScreen