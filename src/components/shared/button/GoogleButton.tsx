import GoogleIcon from '@/assets/svg/google';
import { signInWithGoogle } from '@/src/lib/oauth';
import { useRouter } from 'expo-router';
import { Alert, TouchableOpacity } from 'react-native';

export default function GoogleButton() {
    const router = useRouter();

    const handlePress = async () => {
        try {
            const phone = await signInWithGoogle()
            // router.replace(phone ? "/categories" : '/profile-edit');
        } catch {
            Alert.alert('Error', 'Google sign-in failed');
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} className='items-center justify-center flex'>
            <GoogleIcon />
        </TouchableOpacity>
    );
}
