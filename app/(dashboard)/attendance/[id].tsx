import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, X, Save } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getClassById } from '@/services/classService';
import { useLoader } from '@/context/LoaderContext';
import { createAttendance } from '@/services/attendanceService';
import { Class } from '@/types/class';
import { AttendanceRecords } from '@/types/attendance';
import { formattedDate } from '@/utils/dateFormat';

const AttendanceFormScreen = () => {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    const { hideLoader, showLoader } = useLoader();
    const [loading, setLoading] = useState<boolean>(false);

    const [classData, setClassData] = useState<Class | null>(null);
    const [classId, setClassId] = useState<string | null>(id || null);
    const [date, setDate] = useState<string>(formattedDate);
    const [attendance, setAttendance] = useState<AttendanceRecords>({});

    useEffect(() => {
        const load = async () => {
            try {
                showLoader();
                if (id) {
                    const data = await getClassById(id);
                    setClassData(data);
                    // Initialize attendance state for all students
                    if (data?.students) {
                        const initial: { [student: string]: "present" | "absent" | "late" } = {};
                        data.students.forEach((student: string) => {
                            initial[student] = "present"; // default to present
                        });
                        setAttendance(initial);
                    }
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load class.");
            } finally {
                hideLoader();
            }
        };
        load();
    }, [id]);

    const handleMark = (student: string, status: "present" | "absent" | "late") => {
        setAttendance({ ...attendance, [student]: status });
    };

    const handleSaveAttendance = async () => {
        try {
            if (!id) {
                Alert.alert("Error", "Class ID not found.");
                return;
            }
            showLoader();
            await createAttendance({ classId: id || "", date, records: attendance });
            Alert.alert("Success", "Attendance saved successfully.");
            router.push("/(dashboard)/attendance");
        } catch (error) {
            Alert.alert("Error", "Failed to save attendance.");
        } finally {
            hideLoader();
        }
    };

    return (
  <SafeAreaView className="flex-1 bg-slate-50">
    <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
    
    {/* Header Section - Fixed */}
    <View className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-100">
      {/* Back Button */}
      <TouchableOpacity
        className="flex-row items-center mb-4"
        activeOpacity={0.7}
        onPress={() => router.push('/(dashboard)/attendance')}
      >
        <ArrowLeft size={20} color="#64748B" />
        <Text className="text-slate-600 ml-2 font-medium">Back</Text>
      </TouchableOpacity>

      {/* Title Section */}
      <View className="items-center">
        <Text className="text-2xl font-bold text-slate-900 mb-1">
          Mark Attendance
        </Text>
        <Text className="text-slate-600 text-sm">
          {classData?.name ? `${classData.grade} - ${classData.name}` : "Loading class..."}
        </Text>
      </View>
    </View>

    {/* Students List - Scrollable */}
    <View className="flex-1 px-6 py-4">
      <View className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 flex-1">
        {/* List Header */}
        <View className="px-6 py-4 border-b border-slate-100">
          <Text className="text-lg font-semibold text-slate-800">
            Students ({classData?.students?.length ?? 0})
          </Text>
        </View>

        {/* Scrollable Student Cards */}
        <ScrollView 
          className="flex-1 px-4 py-2" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        >
          {(classData?.students?.length ?? 0) > 0 ? (
            classData?.students?.map((student: string, idx: number) => (
              <View 
                key={idx} 
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-3"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                {/* Student Name */}
                <Text className="text-slate-900 font-semibold text-base mb-3">
                  {student}
                </Text>
                
                {/* Status Badges */}
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className={`flex-1 mx-1 py-2 px-3 rounded-xl flex-row items-center justify-center ${
                      attendance[student] === 'present' 
                        ? 'bg-emerald-100 border-2 border-emerald-500' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                    onPress={() => handleMark(student, 'present')}
                    activeOpacity={0.8}
                  >
                    {attendance[student] === 'present' && (
                      <View className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                    )}
                    <Text className={`text-xs font-semibold ${
                      attendance[student] === 'present' ? 'text-emerald-700' : 'text-slate-600'
                    }`}>
                      Present
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`flex-1 mx-1 py-2 px-3 rounded-xl flex-row items-center justify-center ${
                      attendance[student] === 'absent' 
                        ? 'bg-red-100 border-2 border-red-500' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                    onPress={() => handleMark(student, 'absent')}
                    activeOpacity={0.8}
                  >
                    {attendance[student] === 'absent' && (
                      <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    )}
                    <Text className={`text-xs font-semibold ${
                      attendance[student] === 'absent' ? 'text-red-700' : 'text-slate-600'
                    }`}>
                      Absent
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`flex-1 mx-1 py-2 px-3 rounded-xl flex-row items-center justify-center ${
                      attendance[student] === 'late' 
                        ? 'bg-amber-100 border-2 border-amber-500' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                    onPress={() => handleMark(student, 'late')}
                    activeOpacity={0.8}
                  >
                    {attendance[student] === 'late' && (
                      <View className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                    )}
                    <Text className={`text-xs font-semibold ${
                      attendance[student] === 'late' ? 'text-amber-700' : 'text-slate-600'
                    }`}>
                      Late
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="flex-1 items-center justify-center py-12">
              <Text className="text-slate-500 text-center">No students found for this class.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>

    {/* Save Button - Fixed at Bottom */}
    <View className="px-6 py-4 bg-white/80 backdrop-blur-sm border-t border-slate-100">
      <TouchableOpacity
        className="w-full bg-emerald-600 py-4 rounded-2xl shadow-lg"
        style={{
          shadowColor: '#059669',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 6,
        }}
        activeOpacity={0.9}
        onPress={handleSaveAttendance}
        disabled={loading}
      >
        <View className="flex-row items-center justify-center">
          <Save size={20} color="white" />
          <Text className="text-white text-center font-semibold text-lg ml-2">
            Save Attendance
          </Text>
          {loading && (
            <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 8 }} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
};

export default AttendanceFormScreen;