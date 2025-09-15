import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert
} from 'react-native';
import {
    BookOpen,
    Users,
    Edit3,
    Trash2,
    Plus
} from 'lucide-react-native';
import { useLoader } from '@/context/LoaderContext';
import { Class } from '@/types/class';
import { classColRef, deleteClass, getAllClassesByUserID } from '@/services/classService';
import { getAuth } from 'firebase/auth';
import { router } from 'expo-router';
import { onSnapshot } from 'firebase/firestore';

const ClassesScreen = () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const getColorClasses = (color: string) => {
        switch (color) {
            case '#60A5FA':
                return {
                    iconBg: 'bg-blue-50',
                    iconColor: '#3b82f6',
                    accent: 'border-l-blue-500'
                };
            case '#34D399':
                return {
                    iconBg: 'bg-green-50',
                    iconColor: '#10b981',
                    accent: 'border-l-green-500'
                };
            case '#A78BFA':
                return {
                    iconBg: 'bg-purple-50',
                    iconColor: '#8b5cf6',
                    accent: 'border-l-purple-500'
                };
            case '#F59E42':
                return {
                    iconBg: 'bg-orange-50',
                    iconColor: '#f97316',
                    accent: 'border-l-orange-500'
                };
            case '#F87171':
                return {
                    iconBg: 'bg-red-50',
                    iconColor: '#dc2626',
                    accent: 'border-l-red-500'
                };
            case '#F472B6':
                return {
                    iconBg: 'bg-pink-50',
                    iconColor: '#ec4899',
                    accent: 'border-l-pink-500'
                };
            case '#FBBF24':
                return {
                    iconBg: 'bg-amber-50',
                    iconColor: '#fbbf24',
                    accent: 'border-l-amber-500'
                };
            default:
                return {
                    iconBg: 'bg-slate-50',
                    iconColor: '#64748b',
                    accent: 'border-l-slate-500'
                };
        }
    };

    const { hideLoader, showLoader } = useLoader();

    const [classes, setClasses] = useState<Class[]>([]);

    const handleFetchData = async () => {
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

    const handleDelete = async (id: string) => {
        showLoader()
        Alert.alert(
            "Delete Class",
            "Are you sure you want to delete this class?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        hideLoader()
                    },
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        showLoader()
                        await deleteClass(id)
                            .then(() =>
                                setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== id))
                            ).catch((error) => {
                                console.error("Error deleting class:", error);
                            }).finally(() => {
                                hideLoader()
                            })
                    }
                }
            ]
        )
    }

    useEffect(() => {
    handleFetchData()
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

            {/* Header */}
            <View className="px-6 pt-6 pb-4">
                <Text className="text-2xl font-bold text-slate-800">Classes</Text>
                <Text className="text-slate-600 mt-1">Manage your classes</Text>
            </View>

            {/* Classes List */}
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {classes.map((classItem) => {
                    const colors = getColorClasses(classItem.color);

                    return (
                        <View
                            key={classItem.id}
                            className={`bg-white rounded-2xl shadow-sm border border-slate-100 border-l-4 ${colors.accent} mb-4`}
                        >
                            <View className="p-5">
                                <View className="flex-row items-center justify-between">
                                    {/* Class Info */}
                                    <View className="flex-row items-center flex-1">
                                        <View className={`${colors.iconBg} rounded-full p-3 mr-4`}>
                                            <BookOpen size={24} color={classItem.color} />
                                        </View>

                                        <View className="flex-1">
                                            <Text className="text-lg font-semibold text-slate-800 mb-1">
                                                {classItem.subject} – {classItem.grade}
                                            </Text>
                                            <Text className="text-slate-600 text-sm mb-2">
                                                {classItem.grade} - {classItem.name}
                                            </Text>

                                            <View className="flex-row items-center">
                                                <Users size={16} color="#64748b" />
                                                <Text className="text-slate-500 text-sm ml-2">
                                                    {classItem.students.length} Students
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Action Buttons */}
                                    <View className="flex-row items-center ml-4">
                                        <TouchableOpacity
                                            className="bg-slate-50 rounded-full p-2 mr-2"
                                            activeOpacity={0.7}
                                            onPress={() => router.push(`/classes/${classItem.id}`)}
                                        >
                                            <Edit3 size={18} color="#64748b" />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            className="bg-red-50 rounded-full p-2"
                                            activeOpacity={0.7}
                                            onPress={() => classItem.id && handleDelete(classItem.id)}
                                        >
                                            <Trash2 size={18} color="#dc2626" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}

                {/* Empty State (when no classes) */}
                {classes.length === 0 && (
                    <View className="items-center justify-center mt-20">
                        <View className="bg-slate-100 rounded-full p-6 mb-4">
                            <BookOpen size={48} color="#94a3b8" />
                        </View>
                        <Text className="text-slate-600 text-lg font-medium mb-2">No Classes Yet</Text>
                        <Text className="text-slate-500 text-center">
                            Get started by creating your first class
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Floating Add Button */}
            <TouchableOpacity
                className="absolute bottom-6 right-6 bg-emerald-600 rounded-full w-14 h-14 items-center justify-center shadow-lg"
                style={{
                    shadowColor: '#059669',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                }}
                activeOpacity={0.9}
                onPress={() => { router.push('/classes/new') }}
            >
                <Plus size={28} color="#ffffff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ClassesScreen;