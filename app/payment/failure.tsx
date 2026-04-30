import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export default function PaymentCancel() {
    const router = useRouter();

    useEffect(() => {
        InAppBrowser.closeAuth();
        const timer = setTimeout(() => router.replace('/store'), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Payment failed. Returning to store...</Text>
        </View>
    );
}