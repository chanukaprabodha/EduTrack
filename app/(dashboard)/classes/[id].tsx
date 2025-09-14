// Dynamic route for add & update task
import { useLoader } from '@/context/LoaderContext'
import { createClass, getAllClassesByUserID, getClassById, updateClass } from '@/services/classService'
import { } from '@/services/taskService'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { getAuth } from 'firebase/auth'
import { ArrowLeft, BookOpen, GraduationCap, Plus, Save, Type, Users, X } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ClassFormScreen = () => {

    const { id } = useLocalSearchParams<{ id?: string }>()
    const isNew = !id || id === 'new'

    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const [grade, setGrade] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [students, setStudents] = useState<string[]>([])
    const [studentInput, setStudentInput] = useState<string>("");
    const [teacherId] = useState<string>(userId || "");
    const colorOptions = [
        "#F87171", // red
        "#FBBF24", // yellow
        "#34D399", // green
        "#60A5FA", // blue
        "#A78BFA", // purple
        "#F472B6", // pink
        "#F59E42", // orange
    ];
    const [colorIndex, setColorIndex] = useState<number>(0);
    const [color, setColor] = useState<string>(colorOptions[0]);

    const router = useRouter()
    const { hideLoader, showLoader } = useLoader()

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const load = async () => {
            try {
                showLoader()
                if (!isNew && id) {
                    const classData = await getClassById(id)
                    if (classData) {
                        setName(classData.name)
                        setGrade(classData.grade)
                        setSubject(classData.subject)
                        setStudents(classData.students)
                        setColor(classData.color)
                    }
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load class.")
            } finally {
                hideLoader()
            }
        }
        load()
    }, [id])

    const handleSubmit = async () => {
        if (!grade.trim() || !subject.trim() || !students.length || !name.trim()) {
            Alert.alert("Validation Error", "All fields are required.")
            return
        }

        try {
            setLoading(true);
            showLoader();
            let assignedColor = color;
            if (isNew) {
                const existingClasses = await getAllClassesByUserID(teacherId);
                const colorIdx = existingClasses.length % colorOptions.length;
                assignedColor = colorOptions[colorIdx];
                await createClass({ name, grade, subject, students, teacherId, color: assignedColor })
            }
            else {
                await updateClass(id, { name, grade, subject, students, teacherId, color })
            }
            router.back()
        } catch (error) {
            console.error("Error saving class:", error);
            Alert.alert("Error", "There was an error saving the class. Please try again.")
        } finally {
            setLoading(false);
            hideLoader();
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <View className="px-6 py-8">
                    {/* Back Button */}
                    <TouchableOpacity
                        className="flex-row items-center mb-6"
                        activeOpacity={0.7}
                        onPress={() => router.push('/classes')} // Navigate back to classes list
                    >
                        <ArrowLeft size={20} color="#64748B" />
                        <Text className="text-slate-600 ml-2 font-medium">Back</Text>
                    </TouchableOpacity>

                    {/* Title Section */}
                    <View className="items-center mb-8">
                        <Text className="text-2xl font-bold text-slate-900 mb-2">
                            {isNew ? "Add New Task" : "Edit Task"}
                        </Text>
                        <Text className="text-slate-600 text-sm text-center">
                            {isNew
                                ? "Create a new task to stay organized"
                                : "Update your task details below"
                            }
                        </Text>
                    </View>

                    {/* Form Card */}
                    <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
                        {/* Class Name Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-medium text-slate-700 mb-3">
                                Class Name
                            </Text>
                            <View className="relative">
                                <View className="absolute left-4 top-4 z-10">
                                    <BookOpen size={20} color="#64748b" />
                                </View>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                    placeholder="Enter class name"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        {/* Grade Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-medium text-slate-700 mb-3">
                                Grade
                            </Text>
                            <View className="relative">
                                <View className="absolute left-4 top-4 z-10">
                                    <GraduationCap size={20} color="#64748b" />
                                </View>
                                <TextInput
                                    value={grade}
                                    onChangeText={setGrade}
                                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                    placeholder="e.g., Grade 10, Year 11"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        {/* Subject Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-medium text-slate-700 mb-3">
                                Subject
                            </Text>
                            <View className="relative">
                                <View className="absolute left-4 top-4 z-10">
                                    <Type size={20} color="#64748b" />
                                </View>
                                <TextInput
                                    value={subject}
                                    onChangeText={setSubject}
                                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                    placeholder="e.g., Mathematics, Physics"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        {/* Add Students Section */}
                        <View className="mb-6">
                            <Text className="text-sm font-medium text-slate-700 mb-3">
                                Students
                            </Text>

                            {/* Add Student Input */}
                            <View className="relative mb-4">
                                <View className="absolute left-4 top-4 z-10">
                                    <Users size={20} color="#64748b" />
                                </View>
                                <TextInput
                                    value={studentInput}
                                    onChangeText={setStudentInput}
                                    className="w-full pl-12 pr-20 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                    placeholder="Enter student name"
                                    placeholderTextColor="#94a3b8"
                                    autoCapitalize="words"
                                />
                                <TouchableOpacity
                                    className="absolute right-3 top-3 bg-emerald-500 rounded-full p-2"
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        const name = studentInput.trim();
                                        if (name && !students.includes(name)) {
                                            setStudents([...students, name]);
                                            setStudentInput("");
                                        }
                                    }}
                                >
                                    <Plus size={16} color="#ffffff" />
                                </TouchableOpacity>
                            </View>

                            {/* Students List */}
                            {students.length > 0 && (
                                <View className="bg-slate-50 rounded-2xl p-4">
                                    <Text className="text-xs text-slate-600 mb-3 font-medium">
                                        {students.length} Students Added
                                    </Text>
                                    {students.map((student, index) => (
                                        <View key={index} className="flex-row items-center justify-between bg-white rounded-xl p-3 mb-2 last:mb-0">
                                            <View className="flex-row items-center">
                                                <View className="bg-blue-100 rounded-full w-8 h-8 items-center justify-center mr-3">
                                                    <Text className="text-blue-600 font-medium text-sm">
                                                        {student.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                    </Text>
                                                </View>
                                                <Text className="text-slate-800 font-medium">{student}</Text>
                                            </View>
                                            <TouchableOpacity
                                                className="bg-red-50 rounded-full p-1"
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                    setStudents(students.filter((_, i) => i !== index));
                                                }}
                                            >
                                                <X size={16} color="#dc2626" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {students.length === 0 && (
                                <View className="bg-slate-50 rounded-2xl p-6 items-center">
                                    <View className="bg-slate-200 rounded-full p-3 mb-3">
                                        <Users size={24} color="#94a3b8" />
                                    </View>
                                    <Text className="text-slate-500 text-sm">No students added yet</Text>
                                </View>
                            )}
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            className={`w-full py-5 rounded-2xl shadow-lg ${isNew ? 'bg-emerald-600' : 'bg-blue-600'
                                }`}
                            style={{
                                shadowColor: isNew ? '#059669' : '#3b82f6',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 8,
                                elevation: 6,
                            }}
                            activeOpacity={0.9}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            <View className="flex-row items-center justify-center">
                                <Save size={20} color="white" />
                                <Text className="text-white text-center font-semibold text-lg ml-2">
                                    {isNew ? "Create Class" : "Update Class"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ClassFormScreen