import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { useAvatar } from '@/src/hooks/user/useAvatar';
import { IMAGES } from '@/src/constants/images';
import { useAuth } from '@/src/hooks/useAuth';
import { Feather } from '@expo/vector-icons';
import BackArrow from '@/src/components/shared/BackArrow';
import { useUpdateProfile } from '@/src/hooks/user/useUpdateProfile';

const ProfileHeader = () => {
    const { user } = useAuth()
    const { onSubmit, isSubmitting } = useUpdateProfile();
    const { addAvatar, loading } = useAvatar(onSubmit, user?.id)

    return (
        <View className="relative flex-row justify-center px-4 mt-2">
            <BackArrow />
            <View className='flex-row items-center justify-center gap-4'>
                <Pressable
                    onPress={() => addAvatar(false)}
                    className='relative rounded-full border-2 border-secondary-500'
                >
                    <Image
                        source={user?.avatar_url ? { uri: user.avatar_url } : IMAGES.Avatar}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 100 }}
                    />
                    <View className="absolute -left-2 -bottom-1 z-10 bg-white rounded-full p-1">
                        <View className='bg-gray-200 p-1 rounded-full'>
                            {(loading || isSubmitting) ? <ActivityIndicator size="small" /> : <Feather name="edit-3" size={22} color="#00A6DA" />}
                        </View>
                    </View>
                </Pressable>
                <Text className='text-white font-bagel-regular font-black text-2xl'>
                    {user?.username}
                </Text>
            </View>
            <View className='bg-white rounded-3xl absolute left-6 top-0 flex-row items-center justify-start gap-3 p-0.5 w-1/5'>
                <View className='p-0.5 bg-error rounded-full'>
                    <Image source={IMAGES.Coin} style={{ width: 24, height: 24, objectFit: "contain" }} />
                </View>
                <Text className='font-bagel-regular'>{user?.total_score || 0}</Text>
            </View>
        </View>
    );
};

export default ProfileHeader;