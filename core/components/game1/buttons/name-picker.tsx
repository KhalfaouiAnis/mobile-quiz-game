import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

interface Props {
    name: string,
    onPress: () => void
}

export default function NamePicker({ name, onPress }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={{ width: 200 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR }}
            className="bg-secondary-500 border border-error flex-row justify-center items-center rounded-lg"
        >
            <Text className="ms-auto text-primary-500 font-cairo-bold">{name}</Text>
            <Ionicons name="chevron-down" size={16 * VIEW_SCALE_FACTOR} color="#00A6DA" style={{ marginStart: "auto", paddingEnd: 10 }} />
        </Pressable>
    )
}