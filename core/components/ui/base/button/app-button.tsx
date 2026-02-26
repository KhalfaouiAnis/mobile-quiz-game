import { boxShadow } from "@/core/utils/cn";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface ButtonProps {
    title: string | number;
    onPress: () => void;
    loading?: boolean;
    rounded?: boolean;
    semiRounded?: boolean;
    danger?: boolean;
}

export default function AppButton({ title, onPress, loading, rounded = true, semiRounded = false, danger = false }: ButtonProps) {
    function br() {
        if (rounded) return 24;
        if (semiRounded) return 12;
        return 7
    }
    return (
        <Pressable
            onPress={onPress}
            style={[
                boxShadow().button,
                {
                    borderRadius: br(),
                    backgroundColor: danger ? "#F1190E" : "#00A6DA"
                }
            ]}
            className="items-center justify-center py-2 px-4 border border-secondary-500"
        >
            <Text className="font-cairo-bold text-white text-center">
                {loading ? <ActivityIndicator size="small" color="white" /> : title}
            </Text>
        </Pressable>
    )
}