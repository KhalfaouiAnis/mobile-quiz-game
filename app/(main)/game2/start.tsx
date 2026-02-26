import Container from "@/core/components/ui/shared/container";
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { boxShadow } from "@/core/utils/cn";
import { router } from "expo-router";

export default function Start() {
    return (
        <Container>
            <View className="flex-1 items-center justify-center">
                <View className="items-center justify-center flex-row gap-2">
                    <Text className="bg-error font-cairo-semibold text-xl p-3 text-white">رمز اللعبة: 654547</Text>
                    <View className="bg-error flex-row items-center gap-2 p-3">
                        <Text className="font-bagel-regular text-2xl text-white">4</Text>
                        <Ionicons name="person-outline" color="#fff" size={20 * TEXT_SCALE_FACOTR} style={{ fontWeight: "bold" }} />
                    </View>
                </View>
                <Text className="font-cairo-bold text-2xl text-white pt-3">في انتظار اللاعبين...</Text>
                <View className="mt-1">
                    <QRCode
                        value="http://awesome.link.qr"
                        color="#F1190E"
                    />
                </View>
                <View className="flex-row items-center justify-between w-full px-8 mt-4">
                    <Pressable className="flex-row items-center justify-between p-3 bg-white rounded-2xl"
                        style={[boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button, { width: 200 * VIEW_SCALE_FACTOR }]}
                    >
                        <Text className="text-error font-cairo-bold text-2xl">مدة السؤال</Text>
                        <Ionicons name="chevron-down" color="#00A6DA" size={30 * TEXT_SCALE_FACOTR} />
                    </Pressable>
                    <Pressable
                        className="flex-row items-center justify-center p-3 bg-white rounded-2xl"
                        onPress={()=> router.replace("/game2/gameBoard")}
                        style={[boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button, { width: 200 * VIEW_SCALE_FACTOR }]}
                    >
                        <Text className="text-error font-cairo-bold text-2xl">ابدأ الآن</Text>
                    </Pressable>
                </View>
            </View>
        </Container>
    );
}
