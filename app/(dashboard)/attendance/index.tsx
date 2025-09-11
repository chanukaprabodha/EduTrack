import { View, Text, Pressable, ScrollView, TouchableOpacity, Alert, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteTask, getAllTask, getAllTaskData, taskColRef } from '@/services/taskService'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter, useSegments } from 'expo-router'
import { Task } from '@/types/task'
import { useLoader } from '@/context/LoaderContext'
import { onSnapshot } from 'firebase/firestore'
import { Plus, Edit3, Trash2, CheckCircle, Clock, FileText } from 'lucide-react-native'

const AttendanceScreen = () => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const { hideLoader, showLoader } = useLoader()

  const segments = useSegments()
  const router = useRouter()

  const handleFetchData = async () => {
    showLoader()
    await getAllTaskData()
      .then((data) => {
        setTasks(data);
      }).catch((error) => {
        console.error("Error fetching tasks:", error);
      }).finally(() => {
        hideLoader()
      })
  }

  const handleDelete = async (id: string) => {
    showLoader()
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
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
            await deleteTask(id)
              .then(() =>
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
              ).catch((error) => {
                console.error("Error deleting task:", error);
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
      taskColRef,
      (snapshot) => {
        const taskList = snapshot.docs.map((taskRef) => ({
          id: taskRef.id,
          ...taskRef.data()
        })) as Task[]
        setTasks(taskList)
      },
      (err) => {
        console.error(err)
      }
    )
    return () => unsubcribe()
  }, [])

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* Header Section */}
      <View className="px-6 py-6 bg-white shadow-sm">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-900">My Tasks</Text>
            <Text className="text-slate-600 text-sm mt-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
            </Text>
          </View>
          <View className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl items-center justify-center">
            <CheckCircle size={20} color="white" />
          </View>
        </View>
      </View>

      {/* Tasks List */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
      >
        {tasks.length === 0 ? (
          // Empty State
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
              <FileText size={32} color="#64748B" />
            </View>
            <Text className="text-lg font-semibold text-slate-700 mb-2">No tasks yet</Text>
            <Text className="text-slate-500 text-center mb-6">
              Create your first task to get started with organizing your work
            </Text>
          </View>
        ) : (
          tasks.map((task, index) => {
            return (
              <View key={task.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
                {/* Task Header */}
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1 mr-4">
                    <Text className="text-lg font-bold text-slate-900 mb-1" numberOfLines={2}>
                      {task.title}
                    </Text>
                  </View>

                  {/* Status Indicator */}
                  <View className="w-3 h-3 bg-emerald-400 rounded-full"></View>
                </View>

                {/* Task Description */}
                <Text className="text-sm text-slate-600 mb-4 leading-5" numberOfLines={3}>
                  {task.description}
                </Text>

                {/* Action Buttons */}
                <View className="flex-row justify-end gap-1">
                  <TouchableOpacity
                    className="flex-row items-center bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl"
                    onPress={() => router.push(`/(dashboard)/attendance/${task.id}`)}
                    activeOpacity={0.7}
                  >
                    <Edit3 size={16} color="#3B82F6" />
                    <Text className="text-blue-600 font-medium ml-2 text-sm">Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="flex-row items-center bg-red-50 border border-red-200 px-4 py-2 rounded-xl"
                    onPress={() => task.id && handleDelete(task.id)}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={16} color="#EF4444" />
                    <Text className="text-red-600 font-medium ml-2 text-sm">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-8 right-6">
        <Pressable
          className="w-16 h-16 bg-green-500 rounded-2xl items-center justify-center shadow-lg"
          onPress={() => { router.push('/(dashboard)/attendance/new') }}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <Plus size={28} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default AttendanceScreen