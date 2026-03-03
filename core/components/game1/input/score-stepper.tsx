import DecreaseIcon from "@/assets/svg/decrease";
import IncreaseIcon from "@/assets/svg/increase";
import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { CreateGame1SessionRequest } from "@/core/types/schema/game1";
import { boxShadow } from "@/core/utils/cn";
import { Control, Controller, Path } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

interface Props {
    control: Control<CreateGame1SessionRequest>;
    name: Path<CreateGame1SessionRequest>;
    step?: number;
    colors: {
        border: string;
        icon: string;
        text: string
    }
}

export default function ScoreStepper({ control, name, step = 100, colors: { border, icon, text } }: Props) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
                const currentScore = (value as number) || 0;

                const handleDecreaseScore = () => {
                    if ((currentScore - step) < 0) return;
                    onChange(currentScore - step)
                }

                return (
                    <View
                        style={{
                            boxShadow: boxShadow().button.boxShadow,
                            paddingHorizontal: 40 * VIEW_SCALE_FACTOR,
                            paddingVertical: 4 * VIEW_SCALE_FACTOR,
                            width: 200 * VIEW_SCALE_FACTOR,
                            borderColor: border
                        }}
                        className="bg-white items-center justify-between border-2 rounded-xl  flex-1 flex-row"
                    >
                        <Pressable hitSlop={10} onPress={() => onChange(currentScore + step)}>
                            <IncreaseIcon size={24 * VIEW_SCALE_FACTOR} color={icon} />
                        </Pressable>
                        <Text
                            className="font-bagel-regular text-center"
                            style={{
                                color: text,
                                textShadowRadius: 1,
                                fontSize: 23 * TEXT_SCALE_FACOTR,
                                textShadowColor: "rgba(0, 0, 0, 0.15)",
                                textShadowOffset: { width: 4, height: 4 },
                            }}
                        >
                            {currentScore}
                        </Text>
                        <Pressable hitSlop={10} onPress={handleDecreaseScore}>
                            <DecreaseIcon size={24 * VIEW_SCALE_FACTOR} color={icon} />
                        </Pressable>
                    </View>
                );
            }}
        />

    )
}