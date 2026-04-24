import { boxShadow, cn } from "@/src/utils/cn";
import { ActivityIndicator, DimensionValue, Pressable, Text } from "react-native";

interface ButtonProps {
    title: string | number;
    onPress: () => void;
    loading?: boolean;
    rounded?: boolean;
    semiRounded?: boolean;
    danger?: boolean;
    disabled?: boolean;
    width?: DimensionValue
}

export default function AppButton({ title, onPress, loading, disabled, rounded = true, semiRounded = false, danger = false, width = "auto" }: ButtonProps) {
    function br() {
        if (semiRounded) return 12;
        if (rounded) return 24;
        return 7
    }

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={{
                width,
                borderRadius: br(),
                boxShadow: boxShadow().button.boxShadow,
            }}
            className={cn("items-center justify-center py-2 px-4 border border-secondary-500 disabled:bg-gray-400", {
                "bg-[#F1190E]": danger,
                "bg-[#00A6DA]": !danger,
            })}
        >
            <Text className="font-cairo-bold text-white text-center">
                {loading ? <ActivityIndicator size="small" color="white" /> : title}
            </Text>
        </Pressable>
    )
}