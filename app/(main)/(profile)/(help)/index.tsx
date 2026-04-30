import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import AuthHeader from "@/src/components/layout/AuthHeader";
import Container from "@/src/components/shared/Container";
import ViewWrapper from "@/src/components/shared/ViewWrapper";
import { boxShadow } from "@/src/utils/cn";

export default function Index() {
    return (
        <Container backgroundColor="#00A6DA" header={<AuthHeader showLogo={false} label="مركز المساعدة" />}>
            <View className="px-20 pt-12">
                <ViewWrapper>
                    <View className="gap-y-8 px-28">
                        <Pressable
                            onPress={() => router.navigate("/chat")}
                            className="flex-row items-center gap-4 py-4 px-16 rounded-xl border border-primary-500"
                            style={boxShadow(4)}>
                            <Ionicons name="headset-outline" size={24} color="#00AA30" />
                            <Text className="font-cairo-bold">خدمة العملاء</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.navigate("/chat")}
                            className="flex-row items-center gap-4 py-4 px-16 rounded-xl border border-primary-500"
                            style={boxShadow(4)}>
                            <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                            <Text className="font-cairo-bold">واتساب</Text>
                        </Pressable>
                    </View>
                </ViewWrapper>
            </View>
        </Container>
    );
}
