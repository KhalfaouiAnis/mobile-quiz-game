import DecreaseIcon from "@/assets/svg/decrease";
import IncreaseIcon from "@/assets/svg/increase";
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { useGame1Actions, useGame1Team } from "@/core/store/game1.store";
import { boxShadow, cn } from "@/core/utils/cn";
import { Pressable, Text, View } from "react-native";

interface Props {
    isVertical?: boolean;
    teamId: number,
    colors: {
        border: string;
        icon: string;
        text: string
    }
}

export default function PlusMinus({ isVertical = false, teamId, colors: { border, icon, text } }: Props) {
    const team = useGame1Team(teamId);
    const { addScore } = useGame1Actions();

    return (
        <View
            style={[
                (isVertical ? boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)") : boxShadow()).button,
                {
                    paddingHorizontal: (isVertical ? 10 : 40) * VIEW_SCALE_FACTOR,
                    paddingVertical: 4 * VIEW_SCALE_FACTOR,
                    width: (isVertical ? 82 : 200) * VIEW_SCALE_FACTOR,
                    borderColor: border
                }
            ]}
            className={cn("bg-white items-center justify-around border-2 rounded-xl gap-3 flex-1", {
                "flex-column": isVertical,
                "flex-row": !isVertical,
            })}
        >
            <Pressable onPress={() => { }} className="bg-transparent">
                <IncreaseIcon size={(isVertical ? 44 : 24) * VIEW_SCALE_FACTOR} color={icon} />
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
                <DecreaseIcon size={(isVertical ? 44 : 24) * VIEW_SCALE_FACTOR} />
            </Pressable>
        </View>
    )
}