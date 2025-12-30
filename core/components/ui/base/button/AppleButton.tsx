import AppleIcon from '@/assets/svg/apple';
import { httpClient } from '@/core/api/httpClient';
import { authStore } from '@/core/store/auth.store';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useRouter } from 'expo-router';
import { Alert, Platform, TouchableOpacity } from 'react-native';

export default function AppleButton({ onSuccess }: { onSuccess?: (user: any) => void }) {
    const router = useRouter();

    if (Platform.OS !== 'ios') return null;

    const handlePress = async () => {
        // try {
        //     const appleAuthRequestResponse = await appleAuth.performRequest({
        //         requestedOperation: appleAuth.Operation.LOGIN,
        //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        //     });

        //     const { identityToken } = appleAuthRequestResponse;

        //     if (!identityToken) throw new Error('No identity token');

        //     const res = await httpClient.post('/auth/apple', { idToken: identityToken });

        //     const { accessToken, refreshToken, user } = res.data
        //     authStore.setState({ accessToken, refreshToken, user })

        //     onSuccess?.(user)
        //     router.replace('/categories');
        // } catch (error: unknown) {
        //     console.log({ error });
        //     Alert.alert("Error");
        // }
    };

    return (
        <TouchableOpacity onPress={handlePress} className='items-center justify-center flex'>
            <AppleIcon />
        </TouchableOpacity>
    );
}
