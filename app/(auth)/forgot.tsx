import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Mail, ArrowLeft } from "lucide-react-native";
import { resetPassword } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/services/userService";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(email);
      Alert.alert(
        "Password Reset",
        "We’ve sent you a reset link. Please check your email."
      );
      router.push("/login");
    } catch (error: any) {
      Alert.alert("Reset Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 py-16">
          {/* Header */}
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mb-6"
          >
            <ArrowLeft size={24} color="#334155" />
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-slate-800 mb-2">
            Forgot Password
          </Text>
          <Text className="text-slate-600 text-base mb-8">
            Enter your email and we’ll send you a link to reset your password.
          </Text>

          {/* Email Input */}
          <View className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mb-6">
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

          {/* Reset Button */}
          <TouchableOpacity
            className="w-full bg-emerald-600 py-5 rounded-2xl shadow-lg"
            style={{
              shadowColor: "#3b82f6",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
            }}
            activeOpacity={0.9}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-semibold text-lg">
                Send Reset Link
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
