// Dynamic route for add & update task
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import { Plus, Edit3, FileText, Type, ArrowLeft } from 'lucide-react-native'
import { createTask, getTaskById, updateTask } from '@/services/taskService'
import { useLoader } from '@/context/LoaderContext'

const TaskFormScreen = () => {

    const { id } = useLocalSearchParams<{ id?: string }>()
    const isNew = !id || id === 'new'

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const router = useRouter()
    const { hideLoader, showLoader } = useLoader()

    useEffect(() => {
        const load = async () => {
            try {
                showLoader()
                if (!isNew && id) {
                    const task = await getTaskById(id)
                    if (task) {
                        setTitle(task.title)
                        setDescription(task.description)
                    }
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load task.")
            } finally {
                hideLoader()
            }
        }
        load()
    }, [id])

    const handleSubmit = async () => {
        // validation
        if (!title.trim() || !description.trim()) {
            Alert.alert("Validation Error", "Both title and description are required.")
            return
        }

        try {
            showLoader
            if (isNew) {
                await createTask({ title, description })
            }
            else {
                await updateTask(id, { title, description })
            }
            router.back()
        } catch (error) {
            console.error("Error saving task:", error);
            Alert.alert("Error", "There was an error saving the task. Please try again.")
        } finally {
            hideLoader()
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
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
                        onPress={() => router.push('/(dashboard)/tasks')}
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
                    <View className="bg-white rounded-2xl shadow-xl p-6">
                        {/* Task Title Input */}
                        <View className="mb-6">
                            <Text className="text-sm font-semibold text-slate-700 mb-3">
                                Task Title
                            </Text>
                            <View className="relative">
                                <View className="absolute left-4 top-4 z-10">
                                    <Type size={18} color="#94A3B8" />
                                </View>
                                <TextInput
                                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-slate-900 bg-slate-50 font-medium"
                                    placeholder="Enter task title..."
                                    placeholderTextColor="#94A3B8"
                                    value={title}
                                    onChangeText={setTitle}
                                    autoCapitalize="sentences"
                                />
                            </View>
                        </View>

                        {/* Task Description Input */}
                        <View className="mb-8">
                            <Text className="text-sm font-semibold text-slate-700 mb-3">
                                Task Description
                            </Text>
                            <View className="relative">
                                <View className="absolute left-4 top-4 z-10">
                                    <FileText size={18} color="#94A3B8" />
                                </View>
                                <TextInput
                                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl text-slate-900 bg-slate-50 min-h-[120px]"
                                    placeholder="Describe your task in detail..."
                                    placeholderTextColor="#94A3B8"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline={true}
                                    textAlignVertical="top"
                                    autoCapitalize="sentences"
                                />
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            className={`w-full py-4 rounded-xl shadow-lg ${isNew
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                                }`}
                            onPress={handleSubmit}
                            activeOpacity={0.9}
                        >
                            <View className="flex-row items-center justify-center">
                                {isNew ? (
                                    <Plus size={20} color="white" />
                                ) : (
                                    <Edit3 size={20} color="white" />
                                )}
                                <Text className="text-white text-center font-bold text-base ml-2">
                                    {isNew ? "Create Task" : "Update Task"}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Helper Text */}
                        <View className="mt-4">
                            <Text className="text-xs text-slate-500 text-center leading-4">
                                {isNew
                                    ? "Fill in both fields to create your new task"
                                    : "Make your changes and tap update to save"
                                }
                            </Text>
                        </View>
                    </View>

                    {/* Tips Section */}
                    <View className="mt-6 bg-slate-100 rounded-2xl p-4">
                        <Text className="text-sm font-semibold text-slate-700 mb-2">💡 Tips</Text>
                        <Text className="text-xs text-slate-600 mb-1">
                            • Keep titles short and descriptive
                        </Text>
                        <Text className="text-xs text-slate-600 mb-1">
                            • Include important details in the description
                        </Text>
                        <Text className="text-xs text-slate-600">
                            • Break large tasks into smaller ones
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TaskFormScreen