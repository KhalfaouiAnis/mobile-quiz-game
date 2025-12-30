import { IMAGES } from '@/core/constants/images';
import { Image, View } from 'react-native';
import ArrowBack from './arrow-back';

const AuthHeader = () => {
    return (
        <View className="relative flex-row justify-center px-4 mt-2">
            <ArrowBack />
            <View className='mt-2'>
                <Image source={IMAGES.Game1Logo} style={{ width: 200, height: 50, objectFit: "contain", borderRadius: 8 }} />
            </View>
        </View>
    );
};

export default AuthHeader;