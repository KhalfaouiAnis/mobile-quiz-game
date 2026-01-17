import { boxShadow } from "@/core/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function ArrowBack({ iconName, onPress }: { iconName?: keyof typeof Ionicons.glyphMap, onPress?: () => void }) {
    const handleNavigate = () => {
        if (onPress && typeof onPress === "function") {
            onPress()
            return;
        }
        if (router.canGoBack()) {
            router.back()
        } else {
            router.push("/(main)")
        }
    }
    return (
        <Pressable
            hitSlop={10}
            onPress={handleNavigate}
            style={boxShadow(4, 4, 4, 0, "rgb(000 000 000 / 0.70)").button}
            className='p-0.5 bg-white rounded-full self-start absolute right-6 top-0'>
            <Ionicons name={iconName ? iconName : "chevron-forward"} size={30} color="#00A6DA" />
        </Pressable>
    )
}