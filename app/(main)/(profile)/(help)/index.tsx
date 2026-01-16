import AuthHeader from "@/core/components/ui/layout/auth-header";
import Container from "@/core/components/ui/shared/container";
import ViewWrapper from "@/core/components/ui/shared/view-wrapper";
import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="مركز المساعدة" />}>
            <View className="px-20 pt-12">
                <ViewWrapper>
                    <View className="gap-y-8 px-28">
                        <Pressable
                            onPress={() => router.navigate("/chat")}
                            className="flex-row items-center gap-4 py-4 px-16 rounded-xl border border-primary-500"
                            style={boxShadow(4).button}>
                            <Ionicons name="headset-outline" size={24} color="#00AA30" />
                            <Text className="font-cairo-bold">خدمة العملاء</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.navigate("/chat")}
                            className="flex-row items-center gap-4 py-4 px-16 rounded-xl border border-primary-500"
                            style={boxShadow(4).button}>
                            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                            <Text className="font-cairo-bold">واتساب</Text>
                        </Pressable>
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    );
}
