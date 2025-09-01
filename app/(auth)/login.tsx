import { login } from '@/services/authService';
import { useRouter } from 'expo-router';
import { Chrome, Eye, EyeOff, Facebook, Lock, Mail } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
                Alert.alert("Success", "User logged in successfully");
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
        <View className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#dbeafe" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-6 py-12">
                    <View className="w-full max-w-sm mx-auto">
                        {/* App Logo */}
                        <View className="items-center mb-8">
                            <View className="mb-2 bg-blue-100 rounded-full p-3">
                                <Lock size={32} color="#2563EB" />
                            </View>
                            <Text className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</Text>
                            <Text className="text-gray-600 text-sm">Sign in to your account</Text>
                        </View>

                        {/* Login Form */}
                        <View className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                            {/* Email Input */}
                            <View className="mb-4">
                                <Text className="text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-3 top-3 z-10">
                                        <Mail size={20} color="#9CA3AF" />
                                    </View>
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
                                        placeholder="Enter your email"
                                        placeholderTextColor="#9CA3AF"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View className="mb-4">
                                <Text className="text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-3 top-3 z-10">
                                        <Lock size={20} color="#9CA3AF" />
                                    </View>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
                                        placeholder="Enter your password"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity
                                        className="absolute right-3 top-3"
                                        activeOpacity={0.7}
                                        onPress={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} color="#9CA3AF" />
                                        ) : (
                                            <Eye size={20} color="#9CA3AF" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Forgot Password Link */}
                            <View className="items-end mb-6">
                                <TouchableOpacity activeOpacity={0.7}>
                                    <Text className="text-sm text-blue-600 font-medium">
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                className="w-full bg-blue-600 py-4 rounded-xl shadow-lg"
                                activeOpacity={0.9}
                                onPress={handleLogin}
                            >
                                {
                                    isLoading ? (<ActivityIndicator size="small" color="#FFFFFF" />) : (
                                        <Text className="text-white text-center font-semibold text-base">
                                            Sign In
                                        </Text>
                                    )
                                }
                            </TouchableOpacity>

                            {/* Divider */}
                            <View className="flex-row items-center my-6">
                                <View className="flex-1 h-px bg-gray-300" />
                                <Text className="px-4 text-sm text-gray-500 bg-white">or</Text>
                                <View className="flex-1 h-px bg-gray-300" />
                            </View>

                            {/* Social Login Buttons */}
                            <View className="gap-3">
                                <TouchableOpacity
                                    className="w-full flex-row items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white"
                                    activeOpacity={0.7}
                                >
                                    <View className="mr-3">
                                        <Chrome size={20} color="#4B5563" />
                                    </View>
                                    <Text className="text-gray-700 font-medium">Continue with Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="w-full flex-row items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white"
                                    activeOpacity={0.7}
                                >
                                    <View className="mr-3">
                                        <Facebook size={20} color="#2563EB" />
                                    </View>
                                    <Text className="text-gray-700 font-medium">Continue with Facebook</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Sign Up Link */}
                        <View className="items-center">
                            <View className="flex-row">
                                <Text className="text-gray-600 text-sm">
                                    Don't have an account?{' '}
                                </Text>
                                <TouchableOpacity activeOpacity={0.7}
                                    onPress={() => route.push("/(auth)/register")}>
                                    <Text className="text-blue-600 font-semibold text-sm">
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login