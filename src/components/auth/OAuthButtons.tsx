import * as AppleAuthentication from 'expo-apple-authentication';
import { View, Pressable, ActivityIndicator, Platform } from 'react-native';
import { useGoogleAuth, useFacebookAuth, useAppleAuth } from '@/src/hooks/mutations/useOAuth';
import GoogleIcon from '@/assets/svg/google';
import FacebookIcon from '@/assets/svg/facebook';

interface OAuthButtonsProps {
    onError: (msg: string) => void;
}

export function OAuthButtons({ onError }: OAuthButtonsProps) {
    const google = useGoogleAuth();
    const facebook = useFacebookAuth();
    const apple = useAppleAuth();

    const handleError = (err: unknown) => {
        const msg = (err as Error)?.message ?? 'Authentication failed';
        if (msg === 'CANCELLED') return;
        onError(msg);
    };

    return (
        <View style={{ gap: 10 }}>
            <View className="flex-row gap-6 items-center justify-center">
                <Pressable onPress={() => facebook.mutate(undefined, { onError: handleError })} className='items-center justify-center flex'>
                    {facebook.isPending
                        ? <ActivityIndicator />
                        : <FacebookIcon />}
                </Pressable>
                <Pressable onPress={() => google.mutate(undefined, { onError: handleError })} className='items-center justify-center flex'>
                    {google.isPending
                        ? <ActivityIndicator />
                        : <GoogleIcon />}
                </Pressable>
            </View>

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
