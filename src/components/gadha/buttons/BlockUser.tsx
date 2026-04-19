import { Pressable, View } from "react-native";
import { boxShadow } from "@/src/utils/cn";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BlockUserButton({ onPress, disabled }: { onPress: any, disabled?: boolean }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
        >
            <View
                className="items-center justify-center rounded-[8px] px-1 ms-2"
                style={[
                    boxShadow(3, 3, 0, 0, "rgb(000 000 000 / 1)").button,
                    { backgroundColor: disabled ? "#A8A8A8" : "#F1190E" }
                ]}
            >
                <MaterialCommunityIcons name="account-remove" size={18} color="white" />
            </View>
        </Pressable>
    )
}