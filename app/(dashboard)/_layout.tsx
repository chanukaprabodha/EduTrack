import { View, Text, ActivityIndicator } from 'react-native'
import React, { use, useEffect } from 'react'
import { router, Slot, Tabs, useRouter } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';

const DashboardLayout = () => {

    const { user, loading } = useAuth();
    const route = useRouter();

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
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: (data) => (
                            <MaterialIcons
                                name="home-filled"
                                size={data.size}
                                color={data.color}
                            />
                        ),
                    }}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="setting"
                    options={{
                        title: "Settings",
                        tabBarIcon: (data) => (
                            <MaterialIcons
                                name="settings"
                                size={data.size}
                                color={data.color}
                            />
                        ),
                    }}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: (data) => (
                            <MaterialIcons
                                name="person"
                                size={data.size}
                                color={data.color}
                            />
                        ),
                    }}
                ></Tabs.Screen>
                <Tabs.Screen
                    name="tasks"
                    options={{
                        title: "Tasks",
                        tabBarIcon: (data) => (
                            <MaterialIcons
                                name="check-circle"
                                size={data.size}
                                color={data.color}
                            />
                        ),
                    }}
                ></Tabs.Screen>
            </Tabs>
        </SafeAreaView>
    )
}

export default DashboardLayout