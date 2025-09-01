import { View, Text, Pressable, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { register } from '@/services/authService';
import { Eye, EyeOff, Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react-native';

const Register = () => {

    const route = useRouter();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [cPassword, setCPassword] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const handleRegister = async () => {
        if (isLoading) return;
        if (password !== cPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        setIsLoading(true);
        await register(email, password)
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
        <SafeAreaView className="flex-1 ">
            <StatusBar barStyle="dark-content" backgroundColor="#dbeafe" />
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-1 justify-center px-6 py-12">
                    <View className="w-full max-w-sm mx-auto">

                        {/* Header */}
                        <View className="items-center mb-8">
                            <View className="w-20 h-20 bg-green-500 rounded-2xl mb-4 items-center justify-center shadow-lg">
                                <UserPlus size={28} />
                            </View>
                            <Text className="text-2xl font-bold text-gray-900 mb-2">Create Account</Text>
                            <Text className="text-gray-600 text-sm text-center">Join us and start your journey</Text>
                        </View>

                        {/* Register Form */}
                        <View className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                            {/* Email Input */}
                            <View className="mb-4">
                                <Text className="text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-3 top-3 z-10">
                                        <Mail size={20} color="#9CA3AF" />
                                    </View>
                                    <TextInput
                                        placeholder='Enter your email'
                                        value={email}
                                        onChangeText={setEmail}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
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
                                        placeholder='Create a password'
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
                                        placeholderTextColor="#9CA3AF"
                                        autoCapitalize="none"
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3"
                                        activeOpacity={0.7}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} color="#9CA3AF" />
                                        ) : (
                                            <Eye size={20} color="#9CA3AF" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Confirm Password Input */}
                            <View className="mb-6">
                                <Text className="text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </Text>
                                <View className="relative">
                                    <View className="absolute left-3 top-3 z-10">
                                        <Lock size={20} color="#9CA3AF" />
                                    </View>
                                    <TextInput
                                        placeholder='Confirm your password'
                                        value={cPassword}
                                        onChangeText={setCPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white"
                                        placeholderTextColor="#9CA3AF"
                                        autoCapitalize="none"
                                        autoComplete="password"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3"
                                        activeOpacity={0.7}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} color="#9CA3AF" />
                                        ) : (
                                            <Eye size={20} color="#9CA3AF" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Password Requirements */}
                            <View className="mb-6 p-3 bg-gray-50 rounded-xl">
                                <Text className="text-xs text-gray-600 mb-1">Password must contain:</Text>
                                <Text className="text-xs text-gray-500">• At least 8 characters</Text>
                                <Text className="text-xs text-gray-500">• One uppercase and lowercase letter</Text>
                                <Text className="text-xs text-gray-500">• One number or special character</Text>
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                onPress={handleRegister}
                                disabled={isLoading}
                                className={`w-full py-4 rounded-xl shadow-lg ${isLoading
                                    ? 'bg-gray-400'
                                    : 'bg-green-600'
                                    }`}
                                activeOpacity={isLoading ? 1 : 0.9}
                            >
                                {isLoading ? (
                                    <View className="flex-row items-center justify-center">
                                        <ActivityIndicator color="white" size="small" />
                                        <Text className="text-white font-semibold text-base ml-2">
                                            Creating Account...
                                        </Text>
                                    </View>
                                ) : (
                                    <Text className="text-white text-center font-semibold text-base">
                                        Create Account
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Terms and Conditions */}
                            <View className="mt-4">
                                <Text className="text-xs text-gray-500 text-center leading-4">
                                    By creating an account, you agree to our{' '}
                                    <Text className="text-green-600 font-medium">Terms of Service</Text>
                                    {' '}and{' '}
                                    <Text className="text-green-600 font-medium">Privacy Policy</Text>
                                </Text>
                            </View>
                        </View>

                        {/* Login Link */}
                        <View className="items-center">
                            <View className="flex-row">
                                <Text className="text-gray-600 text-sm">
                                    Already have an account?{' '}
                                </Text>
                                <Pressable
                                    onPress={() => route.back()}
                                    android_ripple={{ color: '#E5E7EB', borderless: true }}
                                >
                                    <Text className="text-green-600 font-semibold text-sm">
                                        Sign In
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register