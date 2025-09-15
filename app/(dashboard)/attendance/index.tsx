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
  BookOpen,
  Users
} from 'lucide-react-native';
import { useLoader } from '@/context/LoaderContext';
import { getAuth } from 'firebase/auth';
import { classColRef, getAllClassesByUserID } from '@/services/classService';
import { Class } from '@/types/class';
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

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className=" px-6 py-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl font-bold text-slate-800">Take Attendance</Text>
          </View>
          <Text className="text-slate-500 text-sm ">Choose a class to take attendance</Text>
        </View>

        {/* Class Grid */}
        <View className="px-6 py-4">
          <View className="flex-row flex-wrap justify-between">
            {classes.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
                style={{
                  width: '48%',
                  aspectRatio: 1,
                  borderWidth: 2,
                  borderColor: classItem.color,
                  shadowColor: classItem.color,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
                activeOpacity={0.7}
                onPress={() => router.push(`/(dashboard)/attendance/${classItem.id}`)}
              >
                <View className="flex-1 justify-between">
                  {/* Top Section - Icon and Grade */}
                  <View className="items-center">
                    <View
                      className="rounded-full p-3 mb-3"
                      style={{ backgroundColor: `${classItem.color}20` }}
                    >
                      <BookOpen size={24} color={classItem.color} />
                    </View>
                    <Text className="text-lg font-bold text-slate-800 text-center">
                      {classItem.grade}
                    </Text>
                  </View>

                  {/* Middle Section - Class Name */}
                  <View className="flex-1 justify-center">
                    <Text
                      className="text-sm font-semibold text-slate-700 text-center"
                      numberOfLines={2}
                    >
                      {classItem.name}
                    </Text>
                  </View>

                  {/* Bottom Section - Students and Subject */}
                  <View className="items-center space-y-2">
                    <View className="flex-row items-center">
                      <Users size={12} color="#64748b" />
                      <Text className="text-slate-600 text-xs ml-1">
                        {classItem.students.length} Students
                      </Text>
                    </View>
                    <Text
                      className="text-xs font-medium text-center px-2 py-1 rounded-full mt-2"
                      style={{
                        backgroundColor: `${classItem.color}15`,
                        color: classItem.color
                      }}
                    >
                      {classItem.subject}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default AttendanceScreen;