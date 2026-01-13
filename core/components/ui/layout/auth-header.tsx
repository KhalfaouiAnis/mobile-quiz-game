import { IMAGES } from '@/core/constants/images';
import { Image, Text, View } from 'react-native';
import ArrowBack from './arrow-back';

interface Props {
    label?: string;
    showLogo?: boolean
}

const AuthHeader = ({ label, showLogo = true }: Props) => {
    return (
        <View className="relative flex-row justify-center px-4 mt-2">
            <ArrowBack />
            <View className='mt-2'>
                {showLogo && (
                    <Image source={IMAGES.Game1Logo} style={{ width: 200, height: 50, objectFit: "contain", borderRadius: 8 }} />
                )}
                {label && (
                    <Text className='text-white text-center text-xl'>{label}</Text>
                )}
            </View>
        </View>
    );
};

export default AuthHeader;