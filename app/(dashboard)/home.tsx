import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native'
import {
  BookCheck,
  Plus,
  ClipboardCheck,
  Users,
  BarChart3,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  Bell,
  Home,
  BookOpen,
  CheckSquare,
  User,
  Settings
} from 'lucide-react-native';
import React from 'react'
import { logout } from '@/services/authService'
import { useRouter } from 'expo-router';

const HomeScreen = () => {

  const route = useRouter();

  const handleLogout = () => {
    logout()
    route.push('/login')
  }

  return (
    // <View className='flex-1 w-full items-center justify-center'>
    //   <Text className='text-4xl'>Home 🏡</Text>
    //   <Pressable className='bg-red-500 p-2 rounded-lg mt-4 w-1/2 items-center' onPress={handleLogout}>
    //     <Text> Logout</Text>
    //   </Pressable>
    // </View>
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-emerald-50 rounded-full p-2 border border-emerald-100 mr-3">
                <BookCheck size={24} color="#059669" />
              </View>
              <Text className="text-lg font-bold text-slate-600">EduTrack</Text>
            </View>
            <TouchableOpacity className="p-2"
            onPress={() => route.push('/setting')}>
              <Settings size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-[48%] mb-4">
              <View className="bg-blue-50 rounded-full p-3 w-12 h-12 items-center justify-center mb-3">
                <Plus size={20} color="#3b82f6" />
              </View>
              <Text className="text-slate-800 font-medium">Create Class</Text>
              <Text className="text-slate-500 text-xs mt-1">Add new class</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-[48%] mb-4">
              <View className="bg-emerald-50 rounded-full p-3 w-12 h-12 items-center justify-center mb-3">
                <ClipboardCheck size={20} color="#059669" />
              </View>
              <Text className="text-slate-800 font-medium">Take Attendance</Text>
              <Text className="text-slate-500 text-xs mt-1">Mark present/absent</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-[48%] mb-4">
              <View className="bg-purple-50 rounded-full p-3 w-12 h-12 items-center justify-center mb-3">
                <Users size={20} color="#8b5cf6" />
              </View>
              <Text className="text-slate-800 font-medium">View Students</Text>
              <Text className="text-slate-500 text-xs mt-1">Manage students</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 w-[48%] mb-4">
              <View className="bg-orange-50 rounded-full p-3 w-12 h-12 items-center justify-center mb-3">
                <BarChart3 size={20} color="#f97316" />
              </View>
              <Text className="text-slate-800 font-medium">Reports</Text>
              <Text className="text-slate-500 text-xs mt-1">View analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Attendance Overview */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4">Today's Overview</Text>
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-700 font-medium">Attendance Summary</Text>
              <View className="bg-emerald-100 rounded-full w-16 h-16 items-center justify-center">
                <Text className="text-emerald-600 font-bold text-lg">85%</Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="items-center">
                <View className="bg-emerald-50 rounded-full p-2 mb-2">
                  <UserCheck size={20} color="#059669" />
                </View>
                <Text className="text-2xl font-bold text-emerald-600">42</Text>
                <Text className="text-slate-500 text-xs">Present</Text>
              </View>

              <View className="items-center">
                <View className="bg-red-50 rounded-full p-2 mb-2">
                  <UserX size={20} color="#dc2626" />
                </View>
                <Text className="text-2xl font-bold text-red-600">8</Text>
                <Text className="text-slate-500 text-xs">Absent</Text>
              </View>

              <View className="items-center">
                <View className="bg-yellow-50 rounded-full p-2 mb-2">
                  <Clock size={20} color="#eab308" />
                </View>
                <Text className="text-2xl font-bold text-yellow-600">3</Text>
                <Text className="text-slate-500 text-xs">Late</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View className="mt-4">
              <View className="bg-slate-200 rounded-full h-2 overflow-hidden">
                <View className="bg-emerald-500 h-full w-[85%] rounded-full" />
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</Text>
          <View className="bg-white rounded-2xl shadow-sm border border-slate-100">
            <View className="p-4 border-b border-slate-100">
              <View className="flex-row items-center">
                <View className="bg-blue-50 rounded-full p-2 mr-3">
                  <ClipboardCheck size={16} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-800 font-medium">Attendance taken for Math 101</Text>
                  <Text className="text-slate-500 text-xs">2 hours ago</Text>
                </View>
              </View>
            </View>

            <View className="p-4 border-b border-slate-100">
              <View className="flex-row items-center">
                <View className="bg-emerald-50 rounded-full p-2 mr-3">
                  <Users size={16} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-800 font-medium">New student added to Physics 201</Text>
                  <Text className="text-slate-500 text-xs">5 hours ago</Text>
                </View>
              </View>
            </View>

            <View className="p-4 border-b border-slate-100">
              <View className="flex-row items-center">
                <View className="bg-purple-50 rounded-full p-2 mr-3">
                  <BarChart3 size={16} color="#8b5cf6" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-800 font-medium">Weekly report generated</Text>
                  <Text className="text-slate-500 text-xs">1 day ago</Text>
                </View>
              </View>
            </View>

            <View className="p-4">
              <View className="flex-row items-center">
                <View className="bg-orange-50 rounded-full p-2 mr-3">
                  <Plus size={16} color="#f97316" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-800 font-medium">Chemistry 301 class created</Text>
                  <Text className="text-slate-500 text-xs">2 days ago</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Reminders */}
        <View className="px-6 mb-20">
          <Text className="text-lg font-semibold text-slate-800 mb-4">Upcoming Reminders</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <View className="flex-row items-center mb-3">
              <View className="bg-blue-50 rounded-full p-2 mr-3">
                <Calendar size={16} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 font-medium">Advanced Mathematics</Text>
                <Text className="text-slate-500 text-sm">Tomorrow at 10:00 AM</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="bg-emerald-50 rounded-full p-2 mr-3">
                <Calendar size={16} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-800 font-medium">Science Laboratory</Text>
                <Text className="text-slate-500 text-sm">Wednesday at 2:00 PM</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="bg-white border-t border-slate-200 px-6 py-3">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="items-center flex-1 py-2">
            <View className="bg-emerald-100 rounded-full p-2 mb-1">
              <Home size={20} color="#059669" />
            </View>
            <Text className="text-emerald-600 text-xs font-medium">Home</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1 py-2">
            <View className="p-2 mb-1">
              <BookOpen size={20} color="#94a3b8" />
            </View>
            <Text className="text-slate-400 text-xs">Classes</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1 py-2">
            <View className="p-2 mb-1">
              <CheckSquare size={20} color="#94a3b8" />
            </View>
            <Text className="text-slate-400 text-xs">Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1 py-2">
            <View className="p-2 mb-1">
              <User size={20} color="#94a3b8" />
            </View>
            <Text className="text-slate-400 text-xs">Profile</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  )
}

export default HomeScreen