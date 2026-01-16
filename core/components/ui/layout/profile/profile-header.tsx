import { IMAGES } from '@/core/constants/images';
import { Feather } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import ArrowBack from '../arrow-back';
import { router } from 'expo-router';

const ProfileHeader = () => {
    return (
        <View className="relative flex-row justify-center px-4 mt-2">
            <ArrowBack />
            <View className='mt-2 flex-row items-center justify-center gap-6'>
                <Pressable className='relative rounded-full border-2 border-secondary-500'
                onPress={()=> router.navigate("/(profile)/guest")}
                >
                    <Image source={IMAGES.Avatar} style={{ width: 100, height: 100, objectFit: "contain" }} />
                    <View className="absolute left-0 -bottom-2 z-10 bg-white rounded-full p-1">
                        <View className='bg-gray-200 p-1 rounded-full'>
                            <Feather name="edit-3" size={24} color="#00A6DA" />
                        </View>
                    </View>
                </Pressable>
                <Text className='text-white font-bagel-regular text-xl'>
                    إلهام
                </Text>
            </View>
            <View className='bg-white rounded-3xl absolute left-6 top-0 flex-row items-center justify-start gap-3 p-0.5 w-1/5'>
                <View className='p-0.5 bg-error rounded-full'>
                    <Image source={IMAGES.Coin} style={{ width: 24, height: 24, objectFit: "contain" }} />
                </View>
                <Text className='font-bagel-regular'>1000</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;