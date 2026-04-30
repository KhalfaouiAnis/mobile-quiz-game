import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export default function PaymentSuccess() {
    const { session_id } = useLocalSearchParams<{ session_id: string }>();
    const router = useRouter();

    useEffect(() => {
        InAppBrowser.closeAuth();

        // Verify the session with your backend
        verifySession(session_id);
    }, []);

    const verifySession = async (sessionId: string) => {
        try {
            const res = await fetch(`https://your-api.com/payment/verify/${sessionId}`);
            const data = await res.json();

            if (data.paid) {
                router.replace('/purchase-confirmed');
            } else {
                router.replace('/purchase-failed');
            }
        } catch {
            router.replace('/purchase-failed');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
            <Text>Confirming your purchase...</Text>
        </View>
    );
}