import { boxShadow } from "@/core/utils/cn";
import { Pressable, Text } from "react-native";

interface ButtonProps {
    title: string | number;
    onPress: () => void
}

export default function AppButton({ title, onPress }: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={boxShadow().button}
            className="bg-primary-500 items-center justify-center py-2 px-4 rounded-3xl border border-secondary-500"
        >
            <Text className="font-cairo-bold text-white">{title}</Text>
        </Pressable>
    )
}