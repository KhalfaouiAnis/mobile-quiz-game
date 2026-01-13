import { boxShadow } from "@/core/utils/cn";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface ButtonProps {
    title: string | number;
    onPress: () => void;
    loading?: boolean;
}

export default function AppButton({ title, onPress, loading }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={boxShadow().button}
            className="bg-primary-500 items-center justify-center py-2 px-4 rounded-3xl border border-secondary-500"
        >
            <Text className="font-cairo-bold text-white text-center">
                {loading ? <ActivityIndicator size="small" color="white" /> : title}
            </Text>
        </Pressable>
    )
}