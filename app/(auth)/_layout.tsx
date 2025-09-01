import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import "./../../global.css"

const AuthLayout = () => {
    // Stack : Wrap the screen components
    return <Stack
        screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
        }}
    >
        <Stack.Screen name="login" options={{title: "Login"}} />
        <Stack.Screen name="register" options={{title: "Create an account"}} />
    </Stack>
}

export default AuthLayout