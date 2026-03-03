import { TEXT_SCALE_FACOTR, VIEW_SCALE_FACTOR } from "@/core/constants";
import { useAudioPlayer } from 'expo-audio';
import { IMAGES } from "@/core/constants/images";
import { boxShadow } from "@/core/utils/cn";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { SOUND_EFFECTS } from "@/core/constants/audio";

export default function DoublePoints({ borderColor, onPress, boosterDisabled }: { borderColor?: string, onPress: any, boosterDisabled?: boolean }) {
    const audioPlayer = useAudioPlayer(SOUND_EFFECTS.DoubleScore);

    const handlePress = () => {
        audioPlayer.seekTo(0)
        audioPlayer.play()
        onPress()
    }

    return (
        <Pressable
            onPress={handlePress}
            disabled={boosterDisabled}
            style={[
                { width: 82 * VIEW_SCALE_FACTOR, borderColor, },
                boxShadow(4, 4, 0, 0, "rgb(000 000 000 / 1)").button]}
            className="items-center justify-center py-2 mt-2 flex-row gap-1.5 bg-white border-2 rounded-lg"
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
                        fontSize: 28 * TEXT_SCALE_FACOTR,
                        textShadowColor: "rgba(0, 0, 0, 0.55)",
                        textShadowOffset: { width: 4, height: 4 }

                    }}
                >
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