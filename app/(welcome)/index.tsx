import { MaterialIcons } from "@expo/vector-icons"
import Container from "@/src/components/shared/Container";
import { boxShadow } from "@/src/utils/cn";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { HAS_LAUNCHED } from "@/src/constants";
import { mmkvStorage } from "@/src/stores/storage";
import { useTranslation } from 'react-i18next';
import { Image } from "expo-image";
import { IMAGES } from "@/src/constants/images";
import { fontScale, scale, verticalScale } from "@/src/utils/dimensions";

export default function Welcome() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState({
        index: 0,
        title: t('welcome.tab0_title'),
        description: t('welcome.tab0_decription')
    })
    const router = useRouter();

    const handleTabTwoPress = () => {
        setActiveTab({
            index: 1,
            title: t('welcome.tab1_title'),
            description: t('welcome.tab1_decription')
        })
    }

    const handleGetStarted = () => {
        if (activeTab.index === 0) {
            handleTabTwoPress();
            return;
        }
        mmkvStorage.set(HAS_LAUNCHED, true);
        router.replace('/(auth)');
    };

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 items-center justify-center gap-y-4">
                <View className="self-center bg-transparent">
                    <Image source={IMAGES.GadghaLogo} style={{ width: 110, height: 60, objectFit: "contain", borderRadius: 50 }} />
                </View>
                <View
                    style={{ boxShadow: boxShadow(4, 16, 32, 0, 'rgba(000,000,000,0.7)').boxShadow, height: verticalScale(270), width: scale(600) }}
                    className="relative bg-white items-center justify-center py-6 px-8 rounded-3xl"
                >
                    <Text
                        style={{ fontSize: fontScale(26) }}
                        className="text-primary-500 font-cairo-bold text-center">
                        {activeTab.title}
                    </Text>
                    <Text
                        numberOfLines={2}
                        className="mt-4 text-center font-cairo-bold"
                        style={{ fontSize: fontScale(22), lineHeight: 28 }}
                    >
                        {activeTab.description}

                    </Text>
                    <View className="flex-row items-center justify-center gap-3 mt-6 mb-10">
                        <View className={`w-6 h-2 ${activeTab.index === 0 ? "bg-secondary-500" : "bg-gray-300"} rounded-xl`} />
                        <View className={`w-6 h-2 ${activeTab.index === 1 ? "bg-secondary-500" : "bg-gray-300"} rounded-xl`} />
                    </View>
                    <View className="absolute -bottom-5">
                        <Pressable
                            hitSlop={6}
                            onPress={handleGetStarted}
                            className="p-4 bg-secondary-500 rounded-full"
                            style={boxShadow(0, 4, 32, 0, "rgb(255 161 107 / 0.60)")}>
                            <MaterialIcons name="arrow-back" size={20} color="#00A6DA" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Container>
    );
}
