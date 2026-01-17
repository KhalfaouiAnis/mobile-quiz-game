import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { boxShadow, cn } from "@/core/utils/cn";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface Props {
    count: number;
    minusAction: () => void;
    plusAction: () => void;
    isVertical?: boolean;
    isTeamA?: boolean
}

export default function PlusMinus({ count, minusAction, plusAction, isVertical = false, isTeamA }: Props) {
    return (
        <View
            style={[boxShadow().button,
            {
                paddingHorizontal: (isVertical ? 10 : 40) * VIEW_SCALE_FACTOR,
                paddingVertical: 8 * VIEW_SCALE_FACTOR,
                width: 200 * VIEW_SCALE_FACTOR, height: 50 * VIEW_SCALE_FACTOR
            }
            ]}
            className={cn("bg-white items-center justify-around border-2 rounded-xl gap-6", {
                "flex-column": isVertical,
                "flex-row": !isVertical,
                "border-primary-500": isTeamA,
                "border-secondary-500": !isTeamA,
            })}
        >
            <Pressable onPress={plusAction} className="bg-transparent">
                <Feather name="plus" size={24} color={isTeamA ? "#00A6DA" : "#F1190E"} />
            </Pressable>
            <Text
                style={{ fontSize: 26 * TEXT_SCALE_FACOTR }}
                className={cn("font-bagel-regular", {
                    "text-secondary-500": isTeamA,
                    "text-primary-500": !isTeamA,
                })}>
                {count}
            </Text>
            <Pressable onPress={minusAction} className="bg-transparent">
                <Feather name="minus" size={24} color="#F1190E" className="font-bagel-regular" />
            </Pressable>
        </View>
    )
}