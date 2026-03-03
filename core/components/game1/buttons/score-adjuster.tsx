import DecreaseIcon from "@/assets/svg/decrease";
import IncreaseIcon from "@/assets/svg/increase";
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { useGame1Actions, useGame1Store, useGame1Team } from "@/core/store/game1.store";
import { Team } from "@/core/types";
import { boxShadow, cn } from "@/core/utils/cn";
import { Pressable, Text, View } from "react-native";

interface Props {
    team?: Partial<Team>,
    colors: {
        border: string;
        icon: string;
        text: string
    }
}

export default function ScoreAdjuster({ team, colors: { border, icon, text } }: Props) {
    const { addScore } = useGame1Actions();

    return (
        <View
            style={[
                boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button,
                {
                    paddingHorizontal: 10 * VIEW_SCALE_FACTOR,
                    paddingVertical: 4 * VIEW_SCALE_FACTOR,
                    width: 82 * VIEW_SCALE_FACTOR,
                    borderColor: border
                }
            ]}
            className="bg-white flex-column items-center justify-around border-2 rounded-xl gap-3 flex-1"
        >
            <Pressable onPress={() => { }} className="bg-transparent">
                <IncreaseIcon size={44 * VIEW_SCALE_FACTOR} color={icon} />
            </Pressable>
            <Text
                style={{
                    textShadowRadius: 1,
                    fontSize: 23 * TEXT_SCALE_FACOTR,
                    color: text,
                    textShadowColor: "rgba(0, 0, 0, 0.15)",
                    textShadowOffset: { width: 4, height: 4 }
                }}
                className="font-bagel-regular">
                {team?.score || 0}
            </Text>
            <Pressable onPress={() => { }} className="bg-transparent">
                <DecreaseIcon size={44 * VIEW_SCALE_FACTOR} />
            </Pressable>
        </View>
    )
}