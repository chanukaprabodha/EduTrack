import { useAuth } from '@/context/AuthContext';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Album, BookOpen, ClipboardX, Home, Landmark, Settings, User } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DashboardLayout = () => {

    const { user, loading } = useAuth();
    const route = useRouter();
    const path = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            route.push("/login");
        }
    }, [loading, user]);

    if (loading) {
        return (
            <View className='flex-1 w-full items-center justify-center'>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View style={{ flex: 1 }}>
                <Slot />
            </View>
            {/* Bottom Navigation */}
            <View className="bg-white border-t border-slate-200 px-6 py-3">
                <View className="flex-row justify-between items-center">
                    <TouchableOpacity className="items-center flex-1 py-2" onPress={() => route.push('/home')}>
                        <View className={path === '/home' ? "bg-emerald-100 rounded-full p-2 mb-1" : "p-2 mb-1"}>
                            <Home size={20} color={path === '/home' ? "#059669" : "#94a3b8"} />
                        </View>
                        <Text className={path === '/home' ? "text-emerald-600 text-xs font-medium" : "text-slate-400 text-xs"}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center flex-1 py-2" onPress={() => route.push('/classes')}>
                        <View className={path === '/classes' ? "bg-emerald-100 rounded-full p-2 mb-1" : "p-2 mb-1"}>
                            <Landmark size={20} color={path === '/classes' ? "#059669" : "#94a3b8"} />
                        </View>
                        <Text className={path === '/classes' ? "text-emerald-600 text-xs font-medium" : "text-slate-400 text-xs"}>Classes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center flex-1 py-2" onPress={() => route.push('/attendance')}>
                        <View className={path === '/attendance' ? "bg-emerald-100 rounded-full p-2 mb-1" : "p-2 mb-1"}>
                            <ClipboardX size={20} color={path === '/attendance' ? "#059669" : "#94a3b8"} />
                        </View>
                        <Text className={path === '/attendance' ? "text-emerald-600 text-xs font-medium" : "text-slate-400 text-xs"}>Attendance</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="items-center flex-1 py-2" onPress={() => route.push('/attendanceHistory')}>
                        <View className={path === '/attendanceHistory' ? "bg-emerald-100 rounded-full p-2 mb-1" : "p-2 mb-1"}>
                            <Album size={20} color={path === '/attendanceHistory' ? "#059669" : "#94a3b8"} />
                        </View>
                        <Text className={path === '/attendanceHistory' ? "text-emerald-600 text-xs font-medium" : "text-slate-400 text-xs"}>Records</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default DashboardLayout