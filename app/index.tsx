import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Index = () => {

    const route = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (user) {
                route.push("/(dashboard)/home")
            } else {
                route.push("/(auth)/login")
            }
        }
    }, [loading, user]);

    return loading ? (
        <View
            //   Flex1: full height
            //   w-full: full width
            className='flex-1 w-full items-center justify-center'>
            <ActivityIndicator size="large" />
        </View>
    ) : null
}

export default Index