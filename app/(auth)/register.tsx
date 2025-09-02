import { View, Text, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { register } from '@/services/authService';
import { Eye, EyeOff, Mail, Lock, UserPlus, ArrowLeft, User, BookCheck } from 'lucide-react-native';
import { createUser } from '@/services/userService';
import { User as UserType } from '@/types/user';
import { auth } from '@/firebase';
import { formattedDate } from '@/utils/dateFormat';

const Register = () => {

    const route = useRouter();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [displayName, setDisplayName] = useState<string>("")
    const [cPassword, setCPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const utcDate = new Date("2025-09-02T11:48:07.646Z");

    const localDate = utcDate.toLocaleString("en-LK", {
        timeZone: "Asia/Colombo",
    });

    const handleRegister = async () => {
        if (isLoading) return;
        if (password !== cPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setIsLoading(true);

        // create firebase auth user
        await register(email, password)

        // create user document in firestore
        const user: UserType = {
            id: auth.currentUser?.uid ?? "",
            email,
            displayName,
            createdAt: formattedDate(),
            classIds: []
        };
        await createUser(user)

            .then(() => {
                Alert.alert("Success", "User registered successfully");
                route.back()
            }).catch((error) => {
                Alert.alert("Error", error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
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
                                Create your account to get started
                            </Text>
                        </View>

                        {/* Register Form */}
                        <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
                            {/* Display Name Input */}
                            <View className="mb-6">
                                <Text className="text-sm font-medium text-slate-700 mb-3">
                                    Full Name
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-4 z-10">
                                        <User size={20} color="#64748b" />
                                    </View>
                                    <TextInput
                                        value={displayName}
                                        onChangeText={setDisplayName}
                                        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                        placeholder="Enter your full name"
                                        placeholderTextColor="#94a3b8"
                                        autoCapitalize="words"
                                        autoComplete="name"
                                    />
                                </View>
                            </View>

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
                                        placeholder="Create a secure password"
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

                            {/* Confirm Password Input */}
                            <View className="mb-8">
                                <Text className="text-sm font-medium text-slate-700 mb-3">
                                    Confirm Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-4 top-4 z-10">
                                        <Lock size={20} color="#64748b" />
                                    </View>
                                    <TextInput
                                        value={cPassword}
                                        onChangeText={setCPassword}
                                        className="w-full pl-12 pr-14 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-slate-50 focus:bg-white focus:border-blue-400"
                                        placeholder="Confirm your password"
                                        placeholderTextColor="#94a3b8"
                                        secureTextEntry={!showConfirmPassword}
                                        autoCapitalize="none"
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity
                                        className="absolute right-4 top-4"
                                        activeOpacity={0.7}
                                        onPress={() => setShowConfirmPassword((prev) => !prev)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} color="#64748b" />
                                        ) : (
                                            <Eye size={20} color="#64748b" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                className="w-full bg-emerald-600 py-5 rounded-2xl shadow-lg"
                                style={{
                                    shadowColor: '#059669',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}
                                activeOpacity={0.9}
                                onPress={handleRegister}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <View className="flex-row items-center justify-center">
                                        <ActivityIndicator size="small" color="#FFFFFF" />
                                        <Text className="text-white font-semibold text-lg ml-2">
                                            Creating Account...
                                        </Text>
                                    </View>
                                ) : (
                                    <Text className="text-white text-center font-semibold text-lg">
                                        Create Account
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Link */}
                        <View className="items-center">
                            <View className="flex-row items-center">
                                <Text className="text-slate-600 text-base">
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => route.back()}
                                >
                                    <Text className="text-emerald-600 font-semibold text-base">
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text className="text-slate-400 text-xs mt-2 text-center">
                                Join the EduTrack community today
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

function getFormattedDate(): string {
    throw new Error('Function not implemented.');
}
