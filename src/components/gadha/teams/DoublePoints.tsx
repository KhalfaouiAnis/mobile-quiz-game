import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { IMAGES } from "@/src/constants/images";
import { boxShadow } from "@/src/utils/cn";
import { moderateScale, scale, verticalScale } from "@/src/utils/sizes";

export default function DoublePoints({ borderColor, onPress, boosterDisabled }: { borderColor?: string, onPress: any, boosterDisabled?: boolean }) {
    return (
        <Pressable
            onPress={onPress}
            disabled={boosterDisabled}
            style={
                {
                    borderColor,
                    borderWidth: 3,
                    width: scale(103),
                    height: verticalScale(60),
                    boxShadow: boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button.boxShadow
                }}
            className="items-center justify-center py-2 flex-row gap-1.5 bg-white rounded-lg"
        >
            <View
                className="items-center justify-center rounded-[10px] px-1 ms-2"
                style={[
                    boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button,
                    { backgroundColor: boosterDisabled ? "#A8A8A8" : "#F1190E" }
                ]}
            >
                <Text
                    className="font-bagel-regular text-white"
                    style={{
                        textShadowRadius: 1,
                        fontSize: moderateScale(28),
                        textShadowColor: "rgba(0, 0, 0, 0.55)",
                        textShadowOffset: { width: 4, height: 4 }

                    }}
                >
                    x2
                </Text>
            </View>
            <Image
                source={IMAGES.AwardCoins}
                style={{ width: scale(34), height: verticalScale(34) }}
                contentFit="contain"
            />
        </Pressable>
    )
}