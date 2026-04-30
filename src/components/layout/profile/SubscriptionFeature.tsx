import { boxShadow } from "@/src/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function SubscriptionFeature({ text }: { text: string }) {
    return (
        <View className="flex-row items-center gap-3 ps-6">
            <View
                style={boxShadow()}
                className="bg-secondary-500 p-1 items-center justify-center rounded-full">
                <Ionicons name="checkmark-outline" color="#00A6DA" size={16} />
            </View>
            <Text className="font-cairo-medium">{text}</Text>
        </View>
    )
}