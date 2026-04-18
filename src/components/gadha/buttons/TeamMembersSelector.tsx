import { CreateGadhaGameSession } from "@/src/types/game.gadha.types";
import { boxShadow } from "@/src/utils/cn";
import { Control, Controller, Path } from "react-hook-form";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import { IMAGES } from "@/src/constants/images";
import ShadowedText from "@/src/components/shared/text/ShadowedText";
import { verticalScale, scale } from "@/src/utils/sizes";

interface Props {
    control: Control<CreateGadhaGameSession>;
    name: Path<CreateGadhaGameSession>;
    step?: number;
    colors: {
        border: string;
        text: string
    }
}

export default function TeamMembersSelector({ control, name, step = 1, colors: { border, text } }: Props) {

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => {
                const currentScore = (value as number) || 0;

                const handleDecreaseScore = () => {
                    if ((currentScore - step) < 0) return;
                    // audioPlayer.seekTo(0);
                    // audioPlayer.play()
                    onChange(currentScore - step)
                }

                const handleIncreaseScore = () => {
                    if (currentScore >= 10) return
                    // audioPlayer.seekTo(0);
                    // audioPlayer.play();
                    onChange(currentScore + step)
                }

                return (
                    <View
                        style={{
                            boxShadow: boxShadow().button.boxShadow,
                            paddingHorizontal: 30,
                            borderColor: border,
                            width: scale(295),
                            height: verticalScale(60),
                        }}
                        className="bg-white items-center justify-between border-2 rounded-xl flex-1 flex-row"
                    >
                        <Pressable hitSlop={10} onPress={handleIncreaseScore} className="pt-2">
                            <Image source={IMAGES.IncrementScore} style={{ width: scale(35), height: verticalScale(35) }} contentFit="contain" />
                        </Pressable>
                        <ShadowedText content={currentScore + ""} fillColor={text} />
                        <Pressable hitSlop={10} onPress={handleDecreaseScore} className="mt-1">
                            <Image source={IMAGES.DecrementScore} style={{ width: scale(35), height: verticalScale(35) }} contentFit="contain" />
                        </Pressable>
                    </View>
                );
            }}
        />

    )
}