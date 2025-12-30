import { MaterialIcons } from "@expo/vector-icons"
import Container from "@/core/components/ui/shared/container";
import { boxShadow } from "@/core/utils/cn";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { HAS_LAUNCHED } from "@/core/constants";
import { mmkvStorage } from "@/core/store/storage";

export default function Welcome() {
    const [activeTab, setActiveTab] = useState({
        index: 0,
        title: "اختبر ذكاءك ووسّع معلوماتك!",
        description: "لعبة مسلية تجمع بين التحدي والتعليم،هدفها تنشيط الذاكرة وزيادة المعرفة العامة."
    })
    const router = useRouter();

    const handleTabTwoPress = () => {
        setActiveTab({
            index: 1,
            title: "اختبار شيق في انتظاركم",
            description: "العب المسابقات مع أصدقائك واحصل على جوائز متنوعة"
        })
    }

    const handleGetStarted = () => {
        if (activeTab.index === 0) {
            handleTabTwoPress();
            return;
        }
        mmkvStorage.set(HAS_LAUNCHED, true);
        router.replace('/(auth)/signin');
    };

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 items-center justify-center gap-y-8">
                <View
                    className="bg-white items-center justify-center py-3 px-20 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <Text className="font-semibold">قدها</Text>
                </View>
                <View style={boxShadow().button}
                    className="relative bg-white items-center justify-center py-6 px-8 rounded-3xl max-w-md"
                >
                    <Text className="font-bold text-primary-500 text-2xl font-cairo-bold text-center">{activeTab.title}</Text>
                    <Text className="font-bold text-xl mt-4 text-center">{activeTab.description}</Text>
                    <View className="flex-row items-center justify-center gap-3 mt-6 mb-10">
                        <View className={`w-6 h-2 ${activeTab.index === 0 ? "bg-secondary-500" : "bg-gray-300"} rounded-xl`} />
                        <View className={`w-6 h-2 ${activeTab.index === 1 ? "bg-secondary-500" : "bg-gray-300"} rounded-xl`} />
                    </View>
                    <View className="absolute -bottom-5">
                        <Pressable
                            onPress={handleGetStarted}
                            hitSlop={6}
                            className="p-4 bg-secondary-500 rounded-full"
                            style={boxShadow(0, 4, 32, 0, "rgb(255 161 107 / 0.60)").button}>
                            <MaterialIcons name="arrow-back" size={20} color="#00A6DA" />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Container>
    );
}
