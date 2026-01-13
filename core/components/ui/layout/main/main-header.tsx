import { IMAGES } from '@/core/constants/images';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export function MainHeader() {
    return (
        <View className="relative flex-row justify-between px-2 mt-2 bg-secondary-500">
            <View className='mt-2 flex-row items-center justify-center'>
                <Link asChild href="/(main)/(profile)">
                    <Pressable className='flex-row items-center gap-2'>
                        <Image className='rounded-full border border-primary-500' source={IMAGES.Avatar} style={{ width: 60, height: 60, objectFit: "contain" }} />
                        <View className="absolute left-0 -bottom-2 z-10 bg-white rounded-full p-1">
                            <Text className='text-white font-bagel-regular text-xl'>إلهام</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
            <View className='mt-10 items-center justify-center'>
                <Link asChild href="/(main)/(profile)">
                    <Pressable className='flex-row items-center gap-2'>
                        <Image className='rounded-3xl border border-primary-500' source={IMAGES.Game1Logo} style={{ width: 60, height: 60, objectFit: "contain" }} />
                        <View className="absolute left-0 -bottom-2 z-10 bg-white rounded-full p-1">
                            <Text className='text-white font-bagel-regular text-xl'>انشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
            <View className='mt-2 flex-row items-center justify-center'>
                <Link asChild href="/(main)/(profile)">
                    <Pressable className='items-center'>
                        <Image className='rounded-3xl border border-primary-500' source={IMAGES.Game1Logo} style={{ width: 60, height: 60, objectFit: "contain" }} />
                        <View className="absolute left-0 -bottom-2 z-10 bg-white rounded-full p-1">
                            <Text className='text-white font-bagel-regular text-xl'>انشاء لعبة</Text>
                        </View>
                    </Pressable>
                </Link>
                <Link asChild href="/(main)/(profile)">
                    <Pressable className='flex-row items-center gap-2'>
                        <View className="absolute left-0 -bottom-2 z-10 bg-white rounded-full p-1">
                            <Text className='text-white font-bagel-regular text-xl'>الانضكمام الى اللعبة</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>
        </View>
    );
};