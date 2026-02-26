import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export default function QuitGame({ isTeamA, onPress }: { onPress: () => void, isTeamA?: boolean }) {
    return (
        <Pressable
            onPress={onPress}
            className="bg-white flex-row items-center justify-center my-2 gap-3 border-2 rounded-lg"
            style={[{
                width: 82 * VIEW_SCALE_FACTOR,
                height: 40 * VIEW_SCALE_FACTOR,
                borderColor: isTeamA ? "#00A6DA" : "#FFF900"
            }, boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button]}
        >
            <Text className="text-error font-cairo-bold text-2xl">
                {isTeamA ? "انهاء" : "رجوع"}
            </Text>
            {
                isTeamA ? (
                    <FontAwesome6 name="close" color="#F1190E" size={16 * VIEW_SCALE_FACTOR} />
                ) : (
                    <Ionicons name="log-out-outline" color="#F1190E" size={16 * VIEW_SCALE_FACTOR} />
                )
            }
        </Pressable>
    )
}