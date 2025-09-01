import { View, Text, Pressable } from 'react-native'
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
    <View className='flex-1 w-full items-center justify-center'>
      <Text className='text-4xl'>Home 🏡</Text>
      <Pressable className='bg-red-500 p-2 rounded-lg mt-4 w-1/2 items-center' onPress={handleLogout}>
        <Text> Logout</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen