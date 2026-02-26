import Container from "@/core/components/ui/shared/container";
import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Text, View } from "react-native";

export default function LoadingSession() {
    return (
        <Container>
            <View className="items-center mt-4">
                <Text className="text-white text-2xl font-cairo-bold">the challenge التحدي</Text>
            </View>
            <View className="justify-center items-center">
                <Text className="text-white mb-1 text-2xl font-cairo-bold">السؤال رقم</Text>
                <View
                    style={{ width: 50 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR }}
                    className="items-center justify-center rounded-full bg-white border"
                >
                    <Text className="text-primary-500 text-3xl font-bagel-regular">1</Text>
                </View>
                <Text className="text-white font-cairo">جاهز ...</Text>
            </View>
        </Container>
    );
}
