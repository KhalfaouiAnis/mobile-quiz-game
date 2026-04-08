import { IMAGES } from '@/core/constants/images';
import { boxShadow } from '@/core/utils/cn';
import { Link } from 'expo-router';
import { Image } from "expo-image"
import { Pressable, Text, View } from 'react-native';
import useAuthStore from '@/core/store/auth.store';
import { moderateScale } from '@/core/utils/sizes';

export function MainHeader() {
    const user = useAuthStore(state => state.user);

    return (
        <View className="relative flex-row justify-between px-2 bg-secondary-500">
            <View className='flex-row items-center justify-center relative z-20'>
                <Link asChild href="/(main)/(profile)">
                    <Pressable className='flex-row items-center gap-2 py-1'>
                        <Image
                            className='rounded-full border border-primary-500'
                            source={user?.avatar_url ? { uri: user.avatar_url } : IMAGES.Avatar}
                            style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 100 }}
                        />
                        <Text className='text-primary-500 font-cairo-bold text-xl'>{user?.username}</Text>
                    </Pressable>
                </Link>
            </View>
            <View className='pt-12 items-center justify-center absolute top-0 end-0 start-0 z-10 w-fit'>
                <Link asChild href="/(main)/game1">
                    <Pressable className='items-center'>
                        <Image className='border border-error bg-white' source={IMAGES.Game1Logo} style={{ width: 120, height: 60, borderRadius: 46, borderWidth: 1, borderColor: "#F1190E" }} contentFit="cover" />
                        <View
                            style={boxShadow().button}
                            className="bg-secondary-500 rounded-xl p-1 px-3 border border-error">
                            <Text
                                style={{ fontSize: moderateScale(18) }}
                                className='font-cairo-bold'
                            >إنشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
            <View className='mt-2 flex-row items-center justify-center absolute end-0 top-1 z-10'>
                <Link asChild href="/(main)/game2/(gamer)/joiner">
                    <Pressable
                        style={boxShadow().button}
                        className='bg-primary-500 rounded-xl p-1 border border-secondary-500 -top-5 items-start'
                    >
                        <Text className='text-white font-bagel-regular text-xl'>الانضمام الى اللعبة</Text>
                    </Pressable>
                </Link>
                <Link asChild href="/(main)/game2">
                    <Pressable className='items-end'>
                        <Image className='border border-error' source={IMAGES.Game1Logo} style={{ width: 120, height: 60, borderRadius: 46, borderWidth: 1, borderColor: "#F1190E" }} contentFit="cover" />
                        <View
                            style={{ boxShadow: boxShadow().button.boxShadow }}
                            className="bg-secondary-500 rounded-xl p-1 px-3 border border-error"
                        >
                            <Text
                                style={{ fontSize: moderateScale(18) }}
                                className='font-cairo-bold'
                            >إنشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
};