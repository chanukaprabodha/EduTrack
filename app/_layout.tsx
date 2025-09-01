import React from 'react'
import { Slot, Stack } from 'expo-router';
import "./../global.css"
import { AuthProvider } from '@/context/AuthContext';
import { LoaderProvider } from '@/context/LoaderContext';

const RootLayout = () => {
    // Slot: Wrap the screen components
    return (
        <LoaderProvider>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </LoaderProvider>
    );
}

export default RootLayout