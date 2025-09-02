import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, BookCheck } from 'lucide-react-native';
import { login } from '@/services/authService';

const Login = () => {
    const route = useRouter();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleLogin = async () => {
        if (isLoading) return;

        setIsLoading(true);
        await login(email, password)
            .then(() => {
                Alert.alert("Success", "Welcome back to EduTrack!");
                route.push("/home");
            })
            .catch((error) => {
                Alert.alert("Login Error", error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-8 py-16">
                    <View className="w-full max-w-sm mx-auto">
                        {/* App Logo & Branding */}
                        <View className="items-center mb-12">
                            <View className="mb-4 bg-emerald-50 rounded-full p-4 border border-emerald-100">
                                <BookCheck size={36} color="#059669" />
                            </View>
                            <Text className="text-3xl font-bold text-slate-800 mb-2">EduTrack</Text>
                            <Text className="text-slate-600 text-base text-center leading-6">
                                Student Attendance Tracker
                            </Text>
                            <Text className="text-slate-500 text-sm mt-2">
                                Welcome back! Please sign in to continue.
                            </Text>
                        </View>

                        {/* Login Form */}
                        <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
                            {/* Email Input */}
                            <View className="mb-6">
                                <Text className="text-sm font-medium text-slate-700 mb-3">
                                    Email Address
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-4 z-10">
                                        <Mail size={20} color="#64748b" />
                                    </View>
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                        placeholder="your.email@example.com"
                                        placeholderTextColor="#94a3b8"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View className="mb-6">
                                <Text className="text-sm font-medium text-slate-700 mb-3">
                                    Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-4 z-10">
                                        <Lock size={20} color="#64748b" />
                                    </View>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        className="w-full pl-12 pr-14 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                        placeholder="Enter your password"
                                        placeholderTextColor="#94a3b8"
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity
                                        className="absolute right-4 top-4"
                                        activeOpacity={0.7}
                                        onPress={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} color="#64748b" />
                                        ) : (
                                            <Eye size={20} color="#64748b" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Forgot Password Link */}
                            <View className="items-end mb-8">
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => route.push("/(auth)/forgot")}
                                >
                                    <Text className="text-sm text-blue-600 font-medium">
                                        Forgot your password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                className="w-full  bg-emerald-600 py-5 rounded-2xl shadow-lg"
                                style={{
                                    shadowColor: '#3b82f6',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}
                                activeOpacity={0.9}
                                onPress={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text className="text-white text-center font-semibold text-lg">
                                        Login
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Link */}
                        <View className="items-center">
                            <View className="flex-row items-center">
                                <Text className="text-slate-600 text-base">
                                    New to EduTrack?{' '}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => route.push("/(auth)/register")}
                                >
                                    <Text className="text-emerald-600 font-semibold text-base">
                                        Create Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text className="text-slate-400 text-xs mt-2 text-center">
                                Join thousands of educators tracking attendance
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Login;