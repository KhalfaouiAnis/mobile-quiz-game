import { IMAGES } from '@/src/constants/images';
import { boxShadow } from '@/src/utils/cn';
import { Link } from 'expo-router';
import { Image } from "expo-image"
import { Pressable, Text, View } from 'react-native';
import { fontScale, scale, verticalScale } from '@/src/utils/dimensions';
import { useAuth } from '@/src/hooks/useAuth';

export function MainHeader() {
    const { user } = useAuth()

    return (
        <View
            style={{ boxShadow: boxShadow(0, 0, 50, 0, "rgba(141 247 251 / 1)").button.boxShadow }}
            className="relative flex-row justify-between px-2 bg-secondary-500">
            <View className='flex-row items-center justify-center relative z-20'>
                <Link asChild href="/(profile)">
                    <Pressable className='flex-row items-center gap-2 py-1'>
                        <Image
                            className='rounded-full border border-primary-500'
                            source={user?.avatar_url ? { uri: user.avatar_url } : IMAGES.Avatar}
                            style={{ width: scale(50), height: scale(50), objectFit: "cover", borderRadius: 100 }}
                        />
                        <Text
                            style={{ fontSize: fontScale(20), lineHeight: 28 }}
                            className='text-primary-500 font-cairo-bold'>{user?.username}</Text>
                    </Pressable>
                </Link>
            </View>
            <View className='mt-2 flex-row items-center justify-center absolute start-1 top-14 z-10'>
                <Link disabled asChild href="/(liar)/create">
                    <Pressable className='items-center'>
                        <Image source={IMAGES.TheLiarLogo} style={{ width: 140, height: 70 }} contentFit="cover" />
                        <View
                            style={{ boxShadow: boxShadow().button.boxShadow, height: 40, width: 140, borderWidth: 1.5, marginTop: -10 }}
                            className="bg-secondary-500 rounded-xl items-center justify-center border-error relative -z-10"
                        >
                            <Text className='font-cairo-bold' style={{ fontSize: fontScale(18) }}>
                                إنشاء لعبة
                            </Text>
                        </View>
                    </Pressable>
                </Link>
                <Link disabled asChild href="/(liar)/join">
                    <Pressable
                        style={boxShadow().button}
                        className='bg-primary-500 rounded-xl p-1 border border-secondary-500 -top-5 items-start'
                    >
                        <Text
                            className='text-white font-bagel-regular'
                            style={{ fontSize: fontScale(20), lineHeight: 28 }}
                        >
                            الانضمام الى اللعبة
                        </Text>
                    </Pressable>
                </Link>
            </View>
            <View className='pt-12 items-center justify-center absolute top-0 end-0 start-0 z-10 w-fit'>
                <Link asChild href="/(gadha)/setup">
                    <Pressable className='items-center'>
                        <Image source={IMAGES.GadghaLogo} style={{ width: 140, height: 70, objectFit: "fill", borderRadius: 50 }} contentFit="cover" />
                        <View
                            style={{ boxShadow: boxShadow().button.boxShadow, height: 40, width: 140, borderWidth: 1.5, marginTop: -5 }}
                            className="bg-secondary-500 rounded-xl items-center justify-center border-error relative -z-10"
                        >
                            <Text
                                style={{ fontSize: fontScale(18) }}
                                className='font-cairo-bold'
                            >إنشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
            <View className='mt-2 flex-row items-center justify-center absolute end-1 top-14 z-10'>
                <Link disabled asChild href="/(challenge)/join">
                    <Pressable
                        style={boxShadow().button}
                        className='bg-primary-500 rounded-xl p-1 border border-secondary-500 -top-5 items-start'
                    >
                        <Text
                            style={{ fontSize: fontScale(20), lineHeight: 28 }}
                            className='text-white font-bagel-regular'>الانضمام الى اللعبة</Text>
                    </Pressable>
                </Link>
                <Link asChild href="/(challenge)/create">
                    <Pressable className='items-center'>
                        <Image source={IMAGES.TheChallengeLogo} style={{ width: 140, height: 70 }} contentFit="cover" />
                        <View
                            style={{ boxShadow: boxShadow().button.boxShadow, width: 140, height: 40, borderWidth: 1.5, marginTop: -10 }}
                            className="bg-secondary-500 rounded-xl items-center justify-center border-error relative -z-10"
                        >
                            <Text
                                style={{ fontSize: fontScale(18) }}
                                className='font-cairo-bold'
                            >إنشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
};