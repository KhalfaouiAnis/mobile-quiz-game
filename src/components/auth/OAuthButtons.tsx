import * as AppleAuthentication from 'expo-apple-authentication';
import { View, Text, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useGoogleAuth, useFacebookAuth, useAppleAuth } from '@/src/hooks/mutations/useOAuth';

interface OAuthButtonsProps {
    onError: (msg: string) => void;
}

export function OAuthButtons({ onError }: OAuthButtonsProps) {
    const google = useGoogleAuth();
    const facebook = useFacebookAuth();
    const apple = useAppleAuth();

    const handleError = (err: unknown) => {
        const msg = (err as Error)?.message ?? 'Authentication failed';
        if (msg === 'CANCELLED') return; // user dismissed — silent
        onError(msg);
    };

    return (
        <View style={{ gap: 10 }}>
            <Pressable
                onPress={() => google.mutate(undefined, { onError: handleError })}
                disabled={google.isPending}
                style={styles.btn}
            >
                {google.isPending
                    ? <ActivityIndicator />
                    : <Text>Continue with Google</Text>}
            </Pressable>

            <Pressable
                onPress={() => facebook.mutate(undefined, { onError: handleError })}
                disabled={facebook.isPending}
                style={styles.btn}
            >
                {facebook.isPending
                    ? <ActivityIndicator />
                    : <Text>Continue with Facebook</Text>}
            </Pressable>

            {Platform.OS === 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={8}
                    style={{ height: 48 }}
                    onPress={() => apple.mutate(undefined, { onError: handleError })}
                />
            )}
        </View>
    );
}

const styles = {
    btn: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
};