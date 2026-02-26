import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

export default function DoublePoints({ isTeamA }: { isTeamA?: boolean }) {

    return (
        <Pressable
            style={[
                {
                    width: 82 * VIEW_SCALE_FACTOR,
                    borderColor: isTeamA ? "#00A6DA" : "#FFF900",

                },
                boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button]}
            className="items-center justify-center py-2 mt-2 flex-row gap-1.5 bg-white border-2 rounded-lg"
        >
            <View
                className="items-center justify-center rounded-[10px] px-1 ms-2"
                style={[
                    boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button,
                    // { backgroundColor: isBoosterApplied ? "#A8A8A8" : "#F1190E" }
                ]}
            >
                <Text
                    style={{
                        textShadowRadius: 1,
                        fontSize: 28 * TEXT_SCALE_FACOTR,
                        textShadowColor: "rgba(0, 0, 0, 0.55)",
                        textShadowOffset: { width: 4, height: 4 }

                    }}
                    className="font-bagel-regular text-white">
                    x2
                </Text>
            </View>
            <Image
                source={IMAGES.AwardCoins}
                style={{ width: 30 * VIEW_SCALE_FACTOR, height: 30 * VIEW_SCALE_FACTOR }}
                contentFit="contain"
            />
        </Pressable>
    )
}