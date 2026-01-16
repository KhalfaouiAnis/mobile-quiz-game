import { Text, View } from "react-native";

export default function ActivePlanBadge() {
    return (
        <View className="flex-row items-center gap-1 p-1.5 py-1 border border-primary-500 rounded-full">
            <Text className="font-cairo text-xs text-primary-500">نشيط</Text>
            <View className="w-1 h-1 rounded-full bg-primary-500" />
        </View>
    )
}