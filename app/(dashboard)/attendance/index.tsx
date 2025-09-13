import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Check,
  X,
  Save,
  ChevronDown,
  Users
} from 'lucide-react-native';
import { useLoader } from '@/context/LoaderContext';
import { getAuth } from 'firebase/auth';
import { classColRef, getAllClassesByUserID } from '@/services/classService';
import { Class } from '@/types/class';
import { formattedDate } from '@/utils/dateFormat';
import { onSnapshot } from 'firebase/firestore';
import { router } from 'expo-router';

const AttendanceScreen = () => {

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  const { hideLoader, showLoader } = useLoader()

  const [classes, setClasses] = useState<Class[]>([]);

  const handleFetchClassData = async () => {
    showLoader()
    if (typeof userId === 'string') {
      await getAllClassesByUserID(userId)
        .then((data) => {
          setClasses(data)
        }).catch((error) => {
          console.error("Error fetching classes:", error)
        })
        .finally(() => {
          hideLoader()
        })
    } else {
      console.error("User ID is undefined. Cannot fetch classes.");
      hideLoader()
    }
  }

  useEffect(() => {
    handleFetchClassData()
    const unsubcribe = onSnapshot(
      classColRef,
      (snapshot) => {
        const classList = snapshot.docs.map((classRef) => ({
          id: classRef.id,
          ...classRef.data()
        })) as Class[]
        setClasses(classList)
      },
      (err) => {
        console.error(err)
      }
    )
    return () => unsubcribe()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-6 py-6">
          <Text className="text-2xl font-bold text-slate-800 mb-6">Take Attendance</Text>
        </View>

        {/* Class Selector or Selected Class Info */}
        <View className="px-6">
          {classes.map((classItem) => (
            <TouchableOpacity
              key={classItem.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-slate-100"
              activeOpacity={0.7}
              onPress={() => router.push(`/attendance/${classItem.id}`)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="bg-blue-50 rounded-full p-2 mr-3">
                    <BookOpen size={20} color={classItem.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-slate-800">
                      {classItem.grade} - {classItem.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Users size={14} color="#64748b" />
                      <Text className="text-slate-600 text-sm ml-1">
                        {classItem.students.length} Students
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-lg font-semibold text-slate-800">
                  {classItem.subject}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceScreen;