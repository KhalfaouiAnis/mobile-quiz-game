import { VIEW_SCALE_FACTOR } from "@/core/constants";
import { boxShadow } from "@/core/utils/cn";
import { Text, View } from "react-native";

export default function TeamName({ name, isTeamA }: { name: string, isTeamA?: boolean }) {
    return (
        <View
            style={[
                {
                    width: 82 * VIEW_SCALE_FACTOR,
                    height: 70 * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900"
                },
                boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button
            ]}
            className="bg-white items-center justify-center border-2 rounded-lg mb-2"
        >
            <Text className="font-cairo-bold text-error text-2xl text-center" numberOfLines={2} ellipsizeMode="tail">{name}</Text>
        </View>
    )
}