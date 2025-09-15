import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import { ChevronRight, Bell, Shield, HelpCircle, LogOut, UserRound } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { logout } from '@/services/authService';
import { useLoader } from '@/context/LoaderContext';
import { useAuth } from '@/context/AuthContext';
import { getUserById } from '@/services/userService';
import { User } from '@/types/user';;

const SettingsScreen = () => {
  const route = useRouter();
  const { user } = useAuth();

  const { hideLoader, showLoader } = useLoader()
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePress = (option: string) => {
    console.log(`Pressed: ${option}`);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const data = await getUserById(user.uid);
          setUserInfo(data);
      }
    };
    fetchUserInfo();
  }, [user]);


  const handleLogout = () => {
    showLoader();
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => {
          hideLoader();
        },
        style: "cancel"
      },
      {
        text: "Logout",
        onPress: () => {
          hideLoader();
          logout();
          route.push('/login');
        }
      }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View className="bg-white pt-3 pb-6 px-6 shadow-sm">
        <Text className="text-2xl font-bold text-slate-900">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
          <View className="flex-row items-center">
            {/* Profile Picture */}
            <View className="w-16 h-16 bg-emerald-100 rounded-lg items-center justify-center mr-4">
              <UserRound size={32} color="#059669" />
            </View>

            {/* User Info */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-slate-900 mb-0.5">
                {userInfo?.displayName || "No Name"}
              </Text>
              <Text className="text-sm text-slate-600 mb-1">
                {userInfo?.email || "No Email"}
              </Text>
              <Text className="text-xs font-medium text-emerald-600">
                Teacher
              </Text>
            </View>
          </View>
        </View>

        {/* Settings Options */}
        <View className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6 overflow-hidden">
          {/* Account */}
          <TouchableOpacity
            onPress={() => handlePress('Account')}
            className="flex-row items-center justify-between p-4 border-b border-slate-100"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center mr-4">
                <UserRound size={20} color="#4f46e5" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-0.5">
                  Account
                </Text>
                <Text className="text-xs text-slate-500">
                  Manage your profile and preferences
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          {/* Notifications */}
          <TouchableOpacity
            onPress={() => handlePress('Notifications')}
            className="flex-row items-center justify-between p-4 border-b border-slate-100"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-4">
                <Bell size={20} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-0.5">
                  Notifications
                </Text>
                <Text className="text-xs text-slate-500">
                  Configure alerts and reminders
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          {/* Privacy & Security */}
          <TouchableOpacity
            onPress={() => handlePress('Privacy & Security')}
            className="flex-row items-center justify-between p-4 border-b border-slate-100"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center mr-4">
                <Shield size={20} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-0.5">
                  Privacy & Security
                </Text>
                <Text className="text-xs text-slate-500">
                  Password, data, and security settings
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity
            onPress={() => handlePress('Help & Support')}
            className="flex-row items-center justify-between p-4"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-amber-100 rounded-lg items-center justify-center mr-4">
                <HelpCircle size={20} color="#d97706" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-slate-900 mb-0.5">
                  Help & Support
                </Text>
                <Text className="text-xs text-slate-500">
                  FAQ, contact us, and tutorials
                </Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 rounded-2xl p-4 flex-row items-center justify-center shadow-sm"
          activeOpacity={0.8}
        >
          <LogOut size={20} color="#ffffff" className="mr-3" />
          <Text className="text-white text-lg font-bold ml-3">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;