import AppButton from "@/core/components/ui/base/button/app-button";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { boxShadow } from "@/core/utils/cn";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function IndexScreen() {
    const router = useRouter();

    return (
        <Container backgroundColor="#00A6DA">
            <View className="flex-1 justify-center px-8 py-4 gap-y-6">
                <View
                    className="bg-white items-center self-center justify-center py-3 px-20 rounded-lg border border-secondary-500"
                    style={boxShadow().button}>
                    <Text className="font-cairo-bold">قدها</Text>
                </View>
                <ViewWrapper>
                    <Text className="text-center text-xl font-cairo-bold mb-4 text-primary-500">مرحبًا بك في عالم التحدي!</Text>
                    <Text className="text-center font-cairo-bold">
                        هنا تبدأ رحلتك لاختبار ذكائك ومعرفتك في مختلف المجالات
                    </Text>
                    <Text className="text-center font-cairo-bold">
                        كوّن حسابك لتتبع نتائجك، اجمع النقاط، وتنافس مع أصدقائك على الصدارة.
                    </Text>
                    <Text className="text-center font-cairo-bold mt-6">
                        ابدأ الآن واختر طريقتك:
                    </Text>
                    <View className="flex-row gap-3 items-center justify-center mt-4">
                        <AppButton title="تسجيل الدخول" onPress={() => router.push("/(auth)/signin")} />
                        <AppButton title="انشاء حساب" onPress={() => router.push("/(auth)/signup")} />
                        <AppButton title="مسح QR للعبة التحدي" onPress={() => { }} />
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    )
}